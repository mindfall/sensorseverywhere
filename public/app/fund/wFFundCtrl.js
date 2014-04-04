angular.module('app')
	.controller('wFFundCtrl', function($scope, $http, $q, $routeParams, $location, wFProjectFactory){

		var projectList = [];
		var projectArray = [];
		var projectAdd = {};

		

		$scope.sortOptions = [
			{value: "name", text: "Sort by project Name"},
		];
		$scope.sortOrder = $scope.sortOptions[0].value;
		/**
		*	Main projects page, shows all projects.
		*/

		projectList = wFProjectFactory.getProjects();
		projectList.then(function(projectList){
			for(var i = 0; i < projectList.length; i++){
				projectArray.push(projectList[i]);
			}
			$scope.projects = projectArray;
		}, function(status){
			console.log(status);
		});

		
		$scope.projectDelete = function(id) {
			removeProject = wFProjectFactory.removeProject(id);
		};
/*		var requiredFunding = $http.get('api/fundAmount');

		requiredFunding.success(function(data, status, headers, config) {
			
			var fundArray = [];
		    var funds = [];

			for(var i = 0; i < data.length; i++){
				fundArray.push(data[i]);
			}
			funds = fundArray.filter(function(elem, pos){
				return fundArray.indexOf(elem) == pos;
			});

			$scope.funds = funds;
			console.log($scope.funds);
	     });
		*/


	});

