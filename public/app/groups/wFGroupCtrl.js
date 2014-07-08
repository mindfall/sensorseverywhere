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
	    	}, function(status) {
	    		console.log(status);
	    	});

	    	var groupToProject = {
	    		groupName : groupName,
	    		projectName: projectName
	    	};
	    	console.log(projectName)
	    	if(projectName === '' || projectName === 'undefined' || projectName === null) {
	    		wFNotifier.error('The group must be added to a project.');
	    		return;
	    	} else {
		    	addGroupToProject = wFProjectFactory.addGroupToProject(groupToProject);
		    	addGroupToProject.then(function(addGroup) {
		    		wFNotifier.notify('The group ' + groupName + ' has been added to project ' + projectName);
		    	}, function(status) {
		    		console.log(status);
		    	});

		    	$location.url('/dashboard');
	    	}

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
					console.log(groupArray);
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

angular.module('app').directive('fileInput', function($parse) {
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
});
/*		template: '<input class="button btn-default" type="file" file-input="files" multiple/>"',
		replace: true,*/