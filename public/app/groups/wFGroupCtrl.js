angular.module('app')
	.controller('wFGroupCtrl', ['$scope', '$http', '$q', '$location', 'wFIdentity', 'wFGroupFactory', 'wFProjectFactory',
								function($scope, $http, $q, $location, wFIdentity, wFGroupFactory, wFProjectFactory){

		var groupList = [];
		var groupArray = [];
		var groupAdd = {};
		var getUserGroups = [];
		var userGroups = [];
		var projectNames = [];
		var user = wFIdentity.currentUser;

		$scope.oneAtATime = true;

	    $scope.createGroup = function(name, belongsTo, description) {
	    	var groupData = {
	    		owner : user._id,
	    		groupName : name,
	    		belongsToProject: belongsTo,
	    		groupDescription: description
	    	};
	    
	    	createGroup = wFGroupFactory.addGroup(groupData);
	    	createGroup.then(function(createGroup) {
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
						$scope.groups = groupArray;
					 	console.log('getGroups ' + $scope.groups);
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
				$scope.members = 1;

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

			projectList = wFProjectFactory.getProjects();
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

		

/*		$scope.filesChanged = function(elem) {

			$scope.files = elem.files;
			$scope.$apply();
		};

		$scope.uploadGroupFile = function() {
			var fd = new FormData();
			angular.forEach($scope.files, function(file) {
				fd.append('groupImage', file);			
			});
			$http.post('/api/uploads', fd, 
			{
				transformRequest: angular.identity,
				headers:{'Content-Type': undefined }
			})
			.success(function(d) {
			//	console.log('This was a success');
				var name = d.name.replace(/\"/g, "");
				$scope.getGroupImages(name);
			})
			.error(function(status) {
			//	console.log('fail');
				console.log(status);
			});
		}*/

		$scope.getGroupImages = function(name) {
	
			var dfd = $q.defer();
			$http({method: 'GET', url: '/api/groupImages/' + name})
				.success(function(data, success, headers, config) {
					dfd.resolve(data);
					$scope.groupImage = data;
					console.log($scope.groupImage);
				}).
				error(function(data, status, headers, config) {
					dfd.reject(status);
			});
			return dfd.promise;
		} 

	//	$scope.getGroupsByUser();
	//	$scope.getGroupImages('monash.png');
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