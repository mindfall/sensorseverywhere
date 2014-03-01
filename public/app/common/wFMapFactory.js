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
					circle: {
						shapeOptions: {
							color: '#662d91'
						}
					},
					marker: false
				},
				edit: {
					featureGroup: drawnItems,
					remove: false
				}
			});
			mapControls = [drawnItems, drawControl];
			console.log('submitted');
			return mapControls;
			
		}



	}

});