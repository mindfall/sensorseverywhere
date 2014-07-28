angular.module('app')
	.factory('wFMapFactory', ['$rootScope', '$location', '$http', '$q', 
		function($rootScope, $location, $http, $q) {

	var mapData = {};
	var editPoints = [];

	return {
		getMapControls : function() {
			
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
						},
						showArea: true,
						metric: true
					},
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

		setMapData : function(geojson) {

			var xPts = [];
			var yPts = [];
			var numPoints = 0;

			for(var i = 0; i < geojson.geometry.coordinates[0].length; i++) {
				xPts.push(geojson.geometry.coordinates[0][i][0]);
				yPts.push(geojson.geometry.coordinates[0][i][1]);
				numPoints = i + 1;
			}
			//grab my location area from here.
			
			mapData = geojson;
	
		},

		getMapData : function() {
			if(mapData == '') {
		 		mapData = 'There is no map data';
		 	}
			return mapData;
		}, 

		getTownAndDistance : function(points) {
	
			var xPts = [];
			var yPts = [];
			var numPoints = 0;
			
			for(var i = 0; i < points[0].length; i++) {
				xPts.push(points[0][i][0]);
				yPts.push(points[0][i][1]);
				numPoints++;
			}

			var center = centerLocation(xPts, yPts, numPoints);

			var dfd = $q.defer();
			var nearestLoc = $http({method: 'GET', url:'http://api.geonames.org/findNearbyPlaceNameJSON?lat=' + center.lat + '&lng=' + center.lng + '&username=miriad'})
				.success(function(data, status, headers, config) {
					dfd.resolve(data);
					data  = JSON.stringify(data.geonames[0])
				}).error(function(data, status, headers, config) {
					dfd.reject(status);
				});

			return dfd.promise;
		},

		getMapArea : function(points) {
			var xPts = [];
			var yPts = [];
			var numPoints = 0;
			
			for(var i = 0; i < points[0].length; i++) {
				xPts.push(points[0][i][0]);
				yPts.push(points[0][i][1]);
				numPoints++;
			}
			
			//grab my location area from here.
			var area = polygonArea(xPts, yPts, numPoints);
			return area;
		},


		addCustomMarker: function(wildlifeClass, monitorType) {

		    var customMarker = L.icon({
		    	iconUrl: '../../img/icons/marker_' + wildlifeClass + '.png',
		    	iconSize: [32, 32],
		    	iconAnchor: [15, 15],
		    	popupAnchor: [-3, -10]
		    });

		    return customMarker;
		},

		setEditMapData : function(coords) {

				var xPts = [];
				var yPts = [];
				var numPoints = 0;

				for(var i = 0; i < coords.length; i++) {
					xPts.push(coords[i][0]);
					yPts.push(coords[i][1]);
					numPoints = i + 1;
				}
				editPoints = coords;
		//		console.log(editPoints);
		},

		getEditMapData : function() {
		
			var points = [];
			for(var i = 0; i < editPoints.length; i ++) {
				points.push(editPoints[i]);
			}
			return points;		
		}



	}
	getMapData();
}]);

function polygonArea(x, y, numPoints) 
{ 
  var area = 0;         // Accumulates area in the loop
  var j = numPoints-1;  // The last vertex is the 'previous' one to the first
  var i = 0;

 	for (i = 0; i < numPoints; i += 1 ) {
     	area = area +  (x[j]+x[i]) * (y[j]-y[i]); 
    	j = i;  //j is previous vertex to i
    }

  	//return (area/2) * 100000;
  	return area * 1000000;
}

function centerLocation(x, y, numPoints) {
	var cx = x;
  	var cy = y;
	var centerX = 0;
    var centerY = 0;
	var i;

	for(i = 0; i < numPoints; i += 1 ) {
		centerX = centerX + cx[i];
 		centerY = centerY + cy[i];
	}

	centerX = centerX / numPoints;
	centerY = centerY / numPoints;

	var center = {
		lat: centerY,
		lng: centerX
	}

	return center;
}		