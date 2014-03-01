angular.module('app').controller('wFMapCtrl', function($rootScope, $scope, wFMapFactory, wFIdentity, wFWildlifeFactory){
	
	var userIsLoggedIn = wFIdentity.isAuthenticated();

	
	var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/b8505041f78249b2bb279b2c58013a2e/997/256/{z}/{x}/{y}.png';
	var basemap = new L.TileLayer(cloudmadeUrl, {maxZoom: 18});
	var mapControls = {};
	var drawnItems = {};
	var drawControl = {};

	var map = new L.Map('map', {
		layers: [basemap],
		center: new L.LatLng(-25, 135), //25, 135
		zoom: 5,
		scrollWheelZoom: false
	});

    new L.Control.GeoSearch({
        provider: new L.GeoSearch.Provider.OpenStreetMap(),
        position: 'topcenter'
    }).addTo(map);

    /**
    * If a user is logged in display the draw control and 
    * the save project button.
    *
    */


    var marker = L.marker([-25, 135]).addTo(map);


    if(userIsLoggedIn == true){
    	$scope.isLoggedIn = userIsLoggedIn;
    	console.log('The user is: ' + $scope.isLoggedIn);
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
   			console.log('no draw control to remove');
   		}
   	}

	// Set the title to show on the polygon button
	//L.drawLocal.draw.toolbar.buttons.polygon = 'Draw a sexy polygon!';

	map.on('draw:created', function (e) {
		var type = e.layerType,
			layer = e.layer;

		if (type === 'marker') {
			layer.bindPopup('A popup!');
		}
		var geojson = e.layer.toGeoJSON();
    	var wkt = Terraformer.WKT.convert(geojson.geometry);
    	console.log(wkt);
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

});




