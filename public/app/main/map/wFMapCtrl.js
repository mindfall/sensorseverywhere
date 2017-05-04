angular.module('app')
	.controller('wFMapCtrl', ['$scope', '$rootScope', '$location', '$timeout', 'wFMapFactory', 'wFIdentity', 'wFWildlifeFactory', 'wFProjectFactory',
		function($scope, $rootScope, $location, $timeout, wFMapFactory, wFIdentity, wFWildlifeFactory, wFProjectFactory){

	if($location.path().split('/')[1] === 'create-project') {
		$("#map").height($(window).height() * .9).width($(window).width() * .75);
	}

	L.Icon.Default.imagePath = 'http://api.tiles.mapbox.com/mapbox.js/v1.0.0beta0.0/images';
	var userIsLoggedIn = wFIdentity.isAuthenticated();

	var esriUrl = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
		hereHybridUrl = 'http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/{type}/{mapID}/hybrid.day/{z}/{x}/{y}/{size}/{format}?app_id={app_id}&app_code={app_code}&lg={language}',
		openMapSurferRoadsUrl = 'http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}';

	var esriTiles = new L.TileLayer(esriUrl, {
										attibution: '&copy; IGN',
										maxNativeZoom: 17,
										maxZoom: 19, 
										subdomains: ['otile1','otile2','otile3','otile4'],
									});

	var openMapSurferRoadsTiles = L.tileLayer(openMapSurferRoadsUrl, {
		maxZoom: 20,
		attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});

	var hereHybridTiles = new L.TileLayer(hereHybridUrl, {
		attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
		subdomains: '1234',
		mapID: 'newest',
		app_id: '<your app_id>',
		app_code: '<your app_code>',
		base: 'aerial',
		maxZoom: 20,
		type: 'maptile',
		language: 'eng',
		format: 'png8',
		size: '256'
	});


	var selectedWildlife = [];
	var markerWildlifeIcons = ['mammal', 'bird', 'reptile'];
	var markerMonitorIcons = ['audio', 'video'];
	var mapControls = {};
	var drawnItems = {};
	var drawControl = {};
	var marker;
	var currentTarget;
	var coords = [];

	var map = new L.Map('map', {
		layers: [openMapSurferRoadsTiles, esriTiles],
		center: new L.LatLng(-25, 135), //25, 135
		zoom: 5,
		scrollWheelZoom: false,
		dragging: true
	});

	var baseMaps = {
		"OpenMap": openMapSurferRoadsTiles,
		"Esri": esriTiles
	};

	var weeds = {},
		plantings = {},
		monitors = {};

	var overLays = {

	}

	
	map.on('click', function() {
		overLays.weeds = 'weeds';
	});

	L.control.layers(baseMaps, overLays).addTo(map);

	map.invalidateSize();

    new L.Control.GeoSearch({
        provider: new L.GeoSearch.Provider.OpenStreetMap(),
        position: 'topleft'
    }).addTo(map);

    /**
    * If a user is logged in display the mapping contrThe answer to your question is that, in general, a given volume of liquid water at room temperature will increase in volume by about 9.05% after freezing. Most materials do the opposite, that is, the solid form of most substances is more dense than their liquid form.ols
    *
    */
    if(userIsLoggedIn === true){
    	
		mapControls = wFMapFactory.getMapControls();
	   	drawnItems = mapControls[0];
	   	drawControl = mapControls[1];
	   	map.addLayer(drawnItems);
   		map.addControl(drawControl);


   	}else{
   		try{
   			var controls = document.getElementsByClassName('leaflet-draw');
   			controls[0].parentNode.removeChild(controls[0]);
   		}
   		catch(err){
   			//console.log('no draw control to remove');
   		}
   	}

	map.on('draw:created', function (e) {
		var type = e.layerType,
			layer = e.layer;
		var geojson = e.layer.toGeoJSON();
		selectedWildlife = wFWildlifeFactory.selectWildlife();
		layer.on('click', function(e) {
				if($location.path().split('/')[1] === 'create-project') {
					e.target.editing.enable();
		   			$scope.showMonitorPopup()
		   			var position = [e.latlng.lat, e.latlng.lng];
		   			wFMapFactory.setMarkerPosition(position);
				}
		   	});
    	wFMapFactory.setMapData(geojson);
		drawnItems.addLayer(e.layer);
	});


	/*
	* get all maps for the home page
	*/

	if($location.path() === '/') {
		projectList = wFProjectFactory.getProjects();
		projectList.then(function(projectList){
			for(var i = 0; i < projectList.length; i++){
				coords = projectList[i].project_location_data.project_coords.coordinates;
				var mapLayer = {
					"type": "Feature",
				    "properties": {},
				    "geometry": {
				        "type": "Polygon",
				        "coordinates": coords
		    		}
				}

				L.geoJson(mapLayer).addTo(map);

				var monitors = projectList[i].project_monitors;
				if(monitors.length !== 0) {

					for(var j = 0; j < monitors.length; j++) {
						var marker = wFMapFactory.addCustomMarker(monitors[j].monitorWildlifeClass, monitors[j].monitorType);
						var icon = L.icon({
							iconUrl: '../' + marker.options.iconUrl,
							iconSize: marker.options.iconSize,
							iconAnchor: marker.options.iconAnchor
						});
						if(monitors[j].monitorPosition !== undefined) {
							L.marker(monitors[j].monitorPosition, {icon: icon}).addTo(map);		
					 	}
					}
				}	
			}
		}, function(status){
			console.log(status);
		});
	}

	/*
	* editMap is used to retrieve per project map data from database
	*/

	$scope.editMap = function() {

		var counter = 0;
		coords = wFMapFactory.getEditMapData();
		var markers = wFMapFactory.getEditMarker();
		
		var geojsonLayer = {
		    "type": "Feature",
		    "properties": {},
		    "geometry": {
		        "type": "Polygon",
		        "coordinates": coords
		    }
		};
		var layers = L.geoJson(geojsonLayer, {
			onEachFeature: function (feature, layer) {
				var coords = [];
				layer.on('dblclick', function(e) {
					$scope.showMonitorPopup();
					var position = [e.latlng.lat, e.latlng.lng];
					wFMapFactory.setMarkerPosition(position);
				});
				layer.on('click', function(e){
					if(counter % 2 == 0) {
						e.target.editing.enable();
						currentTarget = e.target;
						return currentTarget;
					} else {
						e.target.editing.disable();
					 }
					counter++;
				});
				layer.on('mousedown', function(e) {
					//e.target.dragging = true;
				});
				layer.on('mouseout', function(e) {
					//wFMapFactory.updateEditMapData(coords);
				});
			},
		}).addTo(map);

		for(var i = 0; i < markers.length; i++) {
			var marker = wFMapFactory.addCustomMarker(markers[i].wildlife, markers[i].monitorType);
			var icon = L.icon({
				iconUrl: '../' + marker.options.iconUrl,
				iconSize: marker.options.iconSize,
				iconAnchor: marker.options.iconAnchor
			});

			L.marker(markers[i].position, {icon: icon}).addTo(map);
		}

	}

	$scope.viewMap = function() {
		coords = wFMapFactory.getEditMapData();
		var monitors = wFMapFactory.getEditMarker();
		var mapLayer = {
		    "type": "Feature",
		    "properties": {},
		    "geometry": {
		        "type": "Polygon",
		        "coordinates": coords
		    }
		};

		if(monitors.length !== 0) {
			for(var j = 0; j < monitors.length; j++) {
				var marker = wFMapFactory.addCustomMarker(monitors[j].monitorWildlifeClass, monitors[j].monitorType);
				var icon = L.icon({
					iconUrl: '../' + marker.options.iconUrl,
					iconSize: marker.options.iconSize,
					iconAnchor: marker.options.iconAnchor
				});
				L.marker(monitors[j].position, {icon: icon}).addTo(map);		
			}
		}	
		L.geoJson(mapLayer).addTo(map);

	}




	$scope.$on('addMarker', function(event, args) {
		var monitor,
			wildlife,
			i;
		var projectMarker = wFProjectFactory.getProjectMonitors();
		for(i = 0; i < projectMarker.length; i++) {
			if(projectMarker[i].type !== '' || projectMarker[i].type !== undefined) {
				monitor = projectMarker[i].type;
			}
			if(projectMarker[i].wildlifeClass !== '' || projectMarker[i].wildlifeClass !== undefined || projectMarker[i].wildlifeClass !== 'undefined') {
				wildlife = projectMarker[i].wildlifeClass;
			} 
		}
		$scope.updateProjectMarker(args.pos, wildlife, monitor);

		/*****************************

		here is some rough stuff!

		******************************/
		var editMarker = wFProjectFactory.getEditMonitors();
		for(i = 0; i < editMarker.length; i++) {
			if(editMarker[i].type !== '' || editMarker[i].type !== undefined) {
				monitor = editMarker[i].type;
			}
			if(editMarker[i].wildlifeClass !== '' || editMarker[i].wildlifeClass !== undefined || editMarker[i].wildlifeClass !== 'undefined') {
				wildlife = editMarker[i].wildlifeClass;
			} 
		}
		$scope.updateEditMarker(args.pos, wildlife, monitor);

	});

	$scope.updateProjectMarker = function(position, wildlife, monitor) {
		var markerIcon = wFMapFactory.addCustomMarker(wildlife, monitor);
		L.marker(position, {icon: markerIcon}).addTo(map);
	}
	//and here!
	$scope.updateEditMarker = function(position, wildlife, monitor) {
		var markerIcon = wFMapFactory.addCustomMarker(wildlife, monitor);
		markerIcon.options.iconUrl = '../' + markerIcon.options.iconUrl;
		L.marker(position, {icon: markerIcon}).addTo(map);
	}

	$scope.showMonitorPopup = function() {
		$rootScope.$broadcast('showMonitorPopup');
	}

    $scope.onUpdateMap = function() {
    	 //confirm
		if (currentTarget instanceof L.Polygon) {
		 
		 	coords = [];

	        var points = currentTarget.getLatLngs();
		    points.forEach(function(latlngs) {
		        latlng = {
		        	lat: latlngs.lat,
		        	lng: latlngs.lng
		        }
		        coords.push(latlng);
		    });
		    coords.push(points[0]);
		    wFMapFactory.updateEditMapData(coords);
	    }

       console.log(coords);
    }

	$scope.onPopupRemove = function() {
	    var tempMarker = this;
	    // To remove marker on click of delete button in the popup of marker
	 //   $(".marker-delete-button:visible").click(function () {
	        map.removeLayer(tempMarker);
	 //   });
	}

	//I've put a delay in here to allow for the saved map data to propate to the 
	//getProjectById function in the wFEditProjectCtrl file
	if($location.path().split('/')[2] === 'getProject') {
		$timeout(function() {
			$scope.editMap();
		}, 1000);
			
	}

	if($location.path().split('/')[2] === 'project-details') {
		$timeout(function() {
			$scope.viewMap();
		}, 1000)
	}

}]);

function customMarker() {
	var customMarker;
	if(selectedWildlife != ''){
		switch(selectedWildlife[0].classification){
			case 'bird':
				customMarker = 'bird';
				break;
			case 'reptile':
				customMarker = 'reptile';
				break;
			case 'fish':
				customMarker = 'fish';
				break;
			case 'mammal':
				customMarker = 'mammal';
				break;
			default:
				break;
		}
	}
	return customMarker;
}




