angular.module('app')
	.controller('wFGroupCtrl', ['$scope', '$http', '$q', '$location', 'wFNotifier', 'wFIdentity', 'wFGroupFactory', 'wFProjectFactory',
								function($scope, $http, $q, $location, wFNotifier, wFIdentity, wFGroupFactory, wFProjectFactory){

		var groupList = [];
		var groupArray = [];
		var groupAdd = {};
		var getUserGroups = [];
		var userGroups = [];
		var projectNames = [];
		var user = wFIdentity.currentUser;

		$scope.groups = [];
		$scope.oneAtATime = true;

	    $scope.createGroup = function(groupName, projectName, description) {

	    	var groupData = {
	    		email : user.email,
	    		username : user.username,
	    		status : 'accepted',
	    		role : 'owner',
	    		groupName : groupName,
	    		projectName: projectName,
	    		groupDescription: description
	    	};
	    
	    	createGroup = wFGroupFactory.addGroup(groupData);
	    	createGroup.then(function(createGroup) {

	    		groupArray.push(JSON.stringify(createGroup));
	    		$scope.groupArray = groupArray;
		    	var groupToProject = {
		    		groupName : groupName,
		    		projectName: projectName
		    	};

		    	if(projectName === '' || projectName === 'undefined' || projectName === null) {
		    		wFNotifier.error('The group must be added to a project.');
		    		return;
		    	} else {
			    	addGroupToProject = wFProjectFactory.addGroupToProject(groupToProject);
			    	addGroupToProject.then(function(addGroup) {
			    		wFNotifier.notify('The group ' + groupName + ' has been added to project ' + projectName);
			    		$scope.getGroupByName(addGroup.groupName);
			    	}, function(status) {
			    		console.log(status);
			    	});

			    	$location.url('/dashboard');
		    	}

	    	}, function(status) {
	    		console.log(status);
	    	});
	    }

	    $scope.getGroupByName = function(groupName) {

	    	getGroupByName = wFGroupFactory.getGroupByName(groupName);
	          
            getGroupByName.then(function(group){
	          	$scope.groups.push(group);
            }, function(status){
            	console.log(status);
            });
	    }

	    $scope.getGroupsByUser = function() {

	          getUserGroups = wFGroupFactory.getGroupsByUser(user.username);
	          
	          getUserGroups.then(function(getUserGroups){
		            if(getUserGroups.length === 0) {
		              	$scope.message = 'There are currently no groups to display.';
		            } else {
		             	$scope.message = '';
		              	for(var i = 0; i < getUserGroups.length; i++){
		               		userGroups.push(getUserGroups[i]);
		                }
		               /* if(getUserGroups[i].filename) {
		                  var filename = getUserGroups[i].filename;
		                  $scope.getGroupImages(filename);
		                }*/
		            }
		            $scope.groups = userGroups;
		            $scope.members = 1;

	          }, function(status){
	            	console.log(status);
	          });
        }

	    $scope.addUserToGroup = function(username, firstname, gid) {

	    	var userData = {
	    		username: username,
	    		firstname: firstname,
	    		status: 'pending',
	    		gid: gid
	    	};

	    	addUserToGroup = wFGroupFactory.addUserToGroup(userData);
	    	addUserToGroup.then(function(user) {
	    		$scope.status = 'pending';
	    	}, function(status) {
	    		console.log(status);
	    	})
	    }

		/**
		*	Main groups page, shows all groups.
		*/
		$scope.getGroups = function() {
			groupList = wFGroupFactory.getGroups();
			groupList.then(function(groupList){
				for(var i = 0; i < groupList.length; i++){
					groupArray.push(groupList[i]);
					//console.log(groupArray);
				}
				for(var name in groupArray) {
					if(typeof groupArray[name] !== 'function') {
						$scope.groups = groupArray;
					}
				}
			}, function(status){
				console.log(status);
			});
		}


	 	$scope.removeGroup = function(id) {
			var removeGroup = wFGroupFactory.removeGroup(id);
	 		removeGroup.then(function(removeGroup) {
	  			var id = $scope.groups[0]._id;
	 			$scope.groups.splice(id, 1);
	 		}, function(status) {
	 			console.log(status);
	 		});
	 	}

	 	$scope.projectNames = [];

	 	$scope.getProjectNames = function() {

			projectList = wFProjectFactory.getProjectsByUser(user._id);
			projectList.then(function(projectList){
				for(var i = 0; i < projectList.length; i++){
					projectNames.push(projectList[i].project_name);
				}
				
				for(var project_name in projectNames) {
					if(typeof projectNames[project_name] !== 'function') {
						var newProject = {
							name: projectNames[project_name],
							value: projectNames[project_name]
						};
						
						$scope.projectNames.push(newProject);	
						$scope.setProject = {type: $scope.projectNames[0].value};				
						};
					}
			}, function(status){
				console.log(status);
			});
		}
		$scope.getProjectNames();
		if(user) $scope.getGroupsByUser();
}]);

angular.module('app').directive('span', function() {
	return {
		restrict: 'E',
		link: function(scope, element, attrs) {
			if(attrs.ngClick || attrs.href === '' || attrs.href === '#') {
				element.on('click', function(e) {
					e.preventDefault();
					e.stopPropagation();
				})
			}
		}
	}
});

angular.module('app').directive('fileInput', ['$parse', function($parse) {
	return {
		restrict: 'A',
		link: function(scope, elm, attrs) {
			elm.bind('change', function() {
				$parse(attrs.fileInput)
					.assign(scope, elm[0].files);
				scope.$apply();
			})
		}
	}
}]);
/*		template: '<input class="button btn-default" type="file" file-input="files" multiple/>"',
		replace: true,*/