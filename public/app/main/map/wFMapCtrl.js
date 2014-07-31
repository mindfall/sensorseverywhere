angular.module('app')
	.controller('wFMapCtrl', ['$scope', '$rootScope', '$location', '$timeout', 'wFMapFactory', 'wFIdentity', 'wFWildlifeFactory', 'wFProjectFactory',
		function($scope, $rootScope, $location, $timeout, wFMapFactory, wFIdentity, wFWildlifeFactory, wFProjectFactory){

	setMapHeight();
	var userIsLoggedIn = wFIdentity.isAuthenticated();

	var mapquestLink = '<a href="http://www.mapquest.com//">MapQuest</a>';
	var mapquestPic = '<img src="http://developer.mapquest.com/content/osm/mq_logo.png\">';
	var mapQuestUrl = 'http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png';
	var basemap = new L.TileLayer(mapQuestUrl, {
										attibution: 'Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency. Tiles courtesy of '+mapquestLink+mapquestPic,
										maxZoom: 20, 
										subdomains: ['otile1','otile2','otile3','otile4'],
									});
	var selectedWildlife = [];
	var markerWildlifeIcons = ['mammal', 'bird', 'reptile'];
	var markerMonitorIcons = ['audio', 'video'];
	var mapControls = {};
	var drawnItems = {};
	var drawControl = {};
	var marker;

	var map = new L.Map('map', {
		layers: [basemap],
		center: new L.LatLng(-25, 135), //25, 135
		zoom: 5,
		scrollWheelZoom: false,
		dragging: false
	});

    new L.Control.GeoSearch({
        provider: new L.GeoSearch.Provider.OpenStreetMap(),
        position: 'topleft'
    }).addTo(map);

    /**
    * If a user is logged in display the mapping controls
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

		   		if($location.path().split('/')[1] === 'create-project' || $location.path().split('/')[1] === 'get-project') {
					var geojsonFeature = {
						"type": "Feature",
						"properties": {},
						"geometry": {
							"type": "Point",
							"coordinates": [e.latlng.lat, e.latlng.lng]
						}
					}
					var marker;
					L.geoJson(geojsonFeature, {
						pointToLayer: function(feature, latlng) {
							marker = L.marker(e.latlng, {
								title: "Wildlife Monitor",
								alt: "Wildlife Monitor",
								riseOnHover: true,
								draggable: true,
								clickable: false,
							}).bindPopup($scope.showMonitorPopup());
							
							return marker;
						}
					}).addTo(map);
				}
		   	});

    	wFMapFactory.setMapData(geojson);
		drawnItems.addLayer(e.layer);
	});


	map.on('draw:edited', function (e) {
		var layers = e.layers;
		var countOfEditedLayers = 0;
		layers.eachLayer(function(layer) {
			countOfEditedLayers++;
		});
		console.log("Edited " + countOfEditedLayers + " layers");
	});

	/*
	* editMap is used to retrieve per project map data from database
	*/

	$scope.editMap = function() {

		var coords = wFMapFactory.getEditMapData();
		var geojsonFeature = {
		    "type": "Feature",
		    "properties": {},
		    "geometry": {
		        "type": "Polygon",
		        "coordinates": coords

		    }
		};

		var layers = L.geoJson(geojsonFeature, {
			onEachFeature: function (feature, layer) {
				layer.on('click', function(e) {
					e.target.editing.enable();
				})
			}
		}).addTo(map);

	}

	$scope.showMonitorPopup = function() {
		$rootScope.$broadcast('showMonitorPopup');
	}

	$scope.onPopupRemove = function() {
		console.log('remove');
	    var tempMarker = this;
	    // To remove marker on click of delete button in the popup of marker
	 //   $(".marker-delete-button:visible").click(function () {
	        map.removeLayer(tempMarker);
	 //   });
	}
//
	if($location.path().split('/')[2] === 'getProject') {
		$timeout(function() {
			$scope.editMap();
		}, 1000);
			
	}

}]);

function setMapHeight(){
	var map = document.getElementById('map');
	map.style.height = '100%';
}


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




