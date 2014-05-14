angular.module('app')
	.controller('wFGroupCtrl', function($scope, $http, $q, $location, wFIdentity, wFGroupFactory, wFProjectFactory){

		var groupList = [];
		var groupArray = [];
		var groupAdd = {};
		var getUserGroups = [];
		var userGroups = [];
		var projectNames = [];
		var user = wFIdentity.currentUser;

		$scope.oneAtATime = true;

	    $scope.createGroup = function(name, members, belongsTo) {

/*	    	$scope.groupName = name;
	    	$scope.num_members = members;
	    	$scope.belongsTo = belongsTo;*/

	    	var groupData = {
	    		name : name,
	    		members: members,
	    		belongsTo: 'belongsTo'
	    	};

	    	createGroup = wFGroupFactory.addGroup(groupData);
	    	createGroup.then(function(createGroup) {
	    		//console.log('success ' + createGroup);
	    		groupArray.push(JSON.stringify(createGroup));
	    		$scope.groupArray = groupArray;
	    	}, function(status) {
	    		console.log(status);
	    	});

	    }

		/**
		*	Main groups page, shows all groups.
		*/
		$scope.getGroups = function() {
			groupList = wFGroupFactory.getGroups();
			groupList.then(function(groupList){
				for(var i = 0; i < groupList.length; i++){
					groupArray.push(groupList[i]);
				}
				for(var name in groupArray) {
					if(typeof groupArray[name] !== 'function') {
						$scope.groupArray = groupArray;
					}
				}
			}, function(status){
				console.log(status);
			});
		}


		$scope.getGroupsByUser = function() {
			getUserGroups = wFGroupFactory.getGroupsByUser(user._id);
			getUserGroups.then(function(getUserGroups){
		    if(getUserGroups.length === 0) {
		      $scope.message = 'There are currently no groups to display.';
		      
		    } else {
		      $scope.message = '';
		      for(var i = 0; i < getUserGroups.length; i++){
		        userGroups.push(getUserGroups[i]);
		      }
		    }
				$scope.groups = userGroups;
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
	 			console.log(status)
	 		});
	 	}

	 	$scope.getProjectNames = function() {
			projectList = wFProjectFactory.getProjects();
			projectList.then(function(projectList){
				for(var i = 0; i < projectList.length; i++){
					projectNames.push(projectList[i].project_name);
				}

				for(var project_name in projectNames) {
					if(typeof projectNames[project_name] !== 'function') {
					//	console.log('key is ' + project_name + ', value is ' + projectNames[project_name]);
						$scope.projectNames = projectNames;
					}
				}
			}, function(status){
				console.log(status);
			});
		}

		$scope.getGroups();
		$scope.getProjectNames();
	});