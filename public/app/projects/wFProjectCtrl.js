angular.module('app')

	.controller('wFProjectCtrl', function($scope, $http, $q, $location, wFIdentity, wFProjectFactory){

		var projectList = [];
		var projectArray = [];
		var projectAdd = {};

		var getUserProjects = [];
		var userProjects = [];
		
		var user = wFIdentity.currentUser;

		$scope.selectStatus = [
			{name: 'active', value: 'active'},
			{name: 'success', value: 'successfully funded'},
			{name: 'failed', value: 'not funded'},
			{name: 'private', value: 'private'}
		];
		$scope.setStatus = {type: $scope.selectStatus[0].value};


		$scope.sortOptions = [
			{value: "name", text: "Sort by project Name"},
		];
		$scope.sortOrder = $scope.sortOptions[0].value;
		/**
		*	Main projects page, shows all projects.
		*/

		$scope.getProjects = function() {
			projectList = wFProjectFactory.getProjects();
			projectList.then(function(projectList){
				for(var i = 0; i < projectList.length; i++){
					projectArray.push(projectList[i]);
				}
				$scope.projects = projectArray;
			}, function(status){
				console.log(status);
			});
		}


		$scope.getProjectsByUser = function() {
			getUserProjects = wFProjectFactory.getProjectsByUser(user._id);
			getUserProjects.then(function(getUserProjects){
		    if(getUserProjects.length === 0) {
		      $scope.message = 'There are currently no projects to display.'
		    } else {
		      $scope.message = '';
		      for(var i = 0; i < getUserProjects.length; i++){
		        userProjects.push(getUserProjects[i]);
		      }
		    }
				$scope.projects = userProjects;
			}, function(status){
				console.log(status);
			});
		}

	 	$scope.removeProject = function(id) {
			var removeProject = wFProjectFactory.removeProject(id);
	 		removeProject.then(function(removeProject) {
	  		var id = $scope.projects[0]._id;
	 			$scope.projects.splice(id, 1);
	 		}, function(status) {
	 			console.log(status)
	 		});
	 	}


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


		$scope.getProjects();



	});

