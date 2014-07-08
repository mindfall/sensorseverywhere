angular.module('app')
	.controller('wFEditProjectCtrl', ['$scope', '$location', 'wFProjectFactory', 'wFMapFactory',
		function($scope, $location, wFProjectFactory, wFMapFactory){


		var coords = [];
		
		//var user = wFIdentity.currentUser;


		$scope.getProjectById = function(id) {

	 		var project = wFProjectFactory.getProjectById(id);
	 		project.then(function(project) {
	 			$scope.project = project;
	 			console.log($scope.project);
	 			for(var i = 0; i < project.project_coords.points.length; i++) {
	 				coords.push(project.project_coords.points[i]);
	 			}
	 			showLayer = wFMapFactory.setEditMapData(coords);
	 			wFMapFactory.getMapData();
	 			$scope.showLayer = showLayer;
	 	 		}, function(status) {
	 			console.log(status);
	 		})

	 	//	$location.url('/projects/edit/' + id);
			
	 	}


	 	var id = $location.path().split('/')[3] || "Unknown";
		$scope.getProjectById(id);	


	}]);

