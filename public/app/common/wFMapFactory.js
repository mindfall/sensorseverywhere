angular.module('app').factory('wFMapFactory', function($rootScope){

	return {
		getMapControls : function(){
			
			var mapControls = [];

			var drawnItems = new L.FeatureGroup();
			var drawControl = new L.Control.Draw({
				position: 'topleft',
				draw: {
					polyline: {
						metric: true
					},
					polygon: {
						allowIntersection: false,
						showArea: true,
						drawError: {
							color: '#b00b00',
							timeout: 1000
						},
						shapeOptions: {
							color: '#bada55'
						}
					},
				/*	circle: {
						shapeOptions: {
							color: '#662d91'
						}
					},*/
					marker: true,
				},
				edit: {
					featureGroup: drawnItems,
					remove: false
				}
			});
			mapControls = [drawnItems, drawControl];

			return mapControls;
			
		},

		setMapData : function(geojson){

				var xPts = [];
				var yPts = [];
				var numPoints = 0;

				for(var i = 0; i < geojson.geometry.coordinates[0].length; i++){
					xPts.push(geojson.geometry.coordinates[0][i][0]);
					yPts.push(geojson.geometry.coordinates[0][i][1]);
					numPoints = i + 1;
				}

				var area = polygonArea(xPts, yPts, numPoints);
				mapData = geojson;
		},

		getMapData : function(){
			if(mapData == ''){
		 		mapData = 'There is no map data';
		 	}
			return mapData;
		}, 

		addCustomMarker: function(wildlifeClass, monitorType){

		    var customMarker = L.icon({
		    	iconUrl: '../../img/icons/marker_' + wildlifeClass + '.png',
		    	iconSize: [32, 32],
		    	iconAnchor: [15, 15],
		    	popupAnchor: [-3, -10]
		    });

		    return customMarker;
		}

	}

});

function polygonArea(X, Y, numPoints) 
{ 
  area = 0;         // Accumulates area in the loop
  j = numPoints-1;  // The last vertex is the 'previous' one to the first

  for (i=0; i<numPoints; i++)
    { area = area +  (X[j]+X[i]) * (Y[j]-Y[i]); 
      j = i;  //j is previous vertex to i
    }
  return (area/2) * 10000000000;
}