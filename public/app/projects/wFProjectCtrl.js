angular.module('app')
	.controller('wFProjectCtrl', ['$scope', '$http', '$q', '$location', '$interval','$window', 'wFIdentity', 'wFProjectFactory', 'wFMapFactory', 'wFFileFactory',
		function($scope, $http, $q, $location, $interval, $window, wFIdentity, wFProjectFactory, wFMapFactory, wFFileFactory){

		var projectList = [];
		var projectArray = [];
		var projectAdd = {};

		var testVar = 'hello';

		var getUserProjects = [];
		var projectTasks = [];
		var userProjects = [];
		var groups = [];
		var groupProjects = [];

		var coords = [];
		
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
			var imageArray, projectArray = [];
			var projectList = wFProjectFactory.getProjects();
		
			projectList.then(function(projectList){
				for(var i = 0; i < projectList.length; i++){
					projectArray.push(projectList[i])
			/*		var image = wFFileFactory.getFiles('project', projectList[i].project_name, projectList[i].project_image);
					image.then(function(image){
						imageArray.push(image);
					}), function(status) {
						console.log(status);
					};*/
					
				}

/*				setTimeout(function() { 
					for(var i = 0; i < imageArray.length; i++) {
						//$scope.projectImage = imageArray[0];
						projectList[i].image = imageArray[i];
						console.log(imageArray[4]);
						projectArray.push(projectList[i]);
					}
					
					$scope.$apply();
				}, 1000);*/
			

				$scope.projects = projectArray;
			}, function(status){
				console.log(status);
			});
		}
		
		$scope.editProject = function(id) {
	 		$location.url('/projects/getProject/' + id + '/');
		}

		$scope.getProjectTasks = function(id) {

			getProjectTasks = wFProjectFactory.getProjectTasks(id);

			getProjectTasks.then(function(tasks) {
				if(tasks.length === 0 ) {
					console.log('0 tasks');
					return;
				} else {
					for(var i = 0; i < tasks.length; i++ ) {
						projectTasks.push(tasks[i]);
					}
				}
				$scope.tasks = projectTasks;
				}, function(err) {
				console.log(err);
			});
		}
		/**
		* Function to check if user is owner or member 
		**/
	$scope.getProjectsByUser = function() {
			
			getUserProjects = wFProjectFactory.getProjectsByUser(user._id);
			getUserProjects.then(function(getUserProjects){
			//
		    if(getUserProjects.length === 0) {
		    	try {
		    		$scope.getProjectsByGroup();
		    	} catch(e) {
		    		$scope.message = 'There are currently no projects to display.'
		    	}
		    } else {
		      $scope.message = '';
		      for(var i = 0; i < getUserProjects.length; i++){
					    // var image = wFFileFactory.getFiles('project', getUserProjects[i].project_name, getUserProjects[i].project_image);
					    // image.then(function(files){
		       //          $scope.projectImage = files;
		       //      }, function(status){
		       //        console.log(status);
		       //      });
		        userProjects.push(getUserProjects[i]);
		        //call to getProjectTasks using project id
		        $scope.getProjectTasks(getUserProjects[i]._id);
		      }
		    }
			$scope.projects = userProjects;
			}, function(status){
				return status;
				//
			});
		}

		$scope.getProjectsByGroup = function() {
		
			for(var i = 0; i < user.projectGroupRole.length; i++ ) {
				getGroupProjects = wFProjectFactory.getProjectsByGroup(user.projectGroupRole[i].group);
			}

			getGroupProjects.then(function(getGroupProjects){
		    if(getGroupProjects.length === 0) {
		      $scope.message = 'There are currently no projects to display.'
		    } else {
		      $scope.message = '';
		      for(var i = 0; i < getGroupProjects.length; i++){
		        groupProjects.push(getGroupProjects[i]);
		        //call to getProjectTasks using project id
		        $scope.getProjectTasks(getGroupProjects[i]._id); 
		      }
		    }
				$scope.projects = groupProjects;
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
		//console.log($location.path().split('/')[1]);
		if($location.path().split('/')[1] === 'dashboard') {
			$scope.getProjectsByUser();
		}
		if($location.path().split('/')[1] === 'projects') {
			$scope.getProjects();
		}

	}]);

