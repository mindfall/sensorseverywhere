angular.module('app').controller('wFMapCtrl', function($scope, wFMapFactory, wFIdentity, wFWildlifeFactory, wFProjectFactory){
	
	var userIsLoggedIn = wFIdentity.isAuthenticated();

	
	var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/b8505041f78249b2bb279b2c58013a2e/997/256/{z}/{x}/{y}.png';
	var basemap = new L.TileLayer(cloudmadeUrl, {maxZoom: 18});
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
		scrollWheelZoom: false
	});

    new L.Control.GeoSearch({
        provider: new L.GeoSearch.Provider.OpenStreetMap(),
        position: 'topleft'
    }).addTo(map);

    /**
    * If a user is logged in display the mapping controls
    *
    */
    if(userIsLoggedIn == true){
    	
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
		selectedWildlife = wFWildlifeFactory.getSelectedWildlife();
		var customMarker;
		if(selectedWildlife != ''){
			console.log(selectedWildlife);
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
			customMarker = wFMapFactory.addCustomMarker(customMarker);
			marker = L.marker([-25, 135], {icon: customMarker, draggable: true}).addTo(map);
		}
		

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
});




