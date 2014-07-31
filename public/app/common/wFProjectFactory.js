angular.module('app')
	.factory('wFProjectFactory', ['$rootScope', '$http', '$q', '$location', 'wFNotifier', 
		function($rootScope, $http, $q, $location, wFNotifier){

		var mapData = [];
		var wildlifeData = [];
		var monitorArray = [];

		return {
				setWildlifeData : function(wildlife) {
					wildlifeData = wildlife;
				},

				getWildlifeData : function() {
					return wildlifeData;
				},

				setMonitorData : function(monitor) {
					monitorArray.push(monitor);
				},

				getMonitorData : function() {
					return monitorArray;
				},

				getProjects : function() {
					var dfd = $q.defer();
					$http({method: 'GET', url: '/api/projects'})
						.success(function(data, status, headers, config) {
							dfd.resolve(data);
						})
						.error(function(data, status, headers, config) {
							dfd.reject(status);
						});
					return dfd.promise;

				},

				getProjectById : function(id) {
					var dfd = $q.defer();
					$http({method: 'GET', url: '/api/getProject/' + id})
						.success(function(data, success, headers, config) {
							dfd.resolve(data);				
						})
						.error(function(data, status, headers, config) {
							dfd.reject(status);
						});
					return dfd.promise;
				},

				getProjectTasks : function(id) {
					var dfd = $q.defer();
					$http({method: 'GET', url: '/api/getProjectTasks/' + id})
						.success(function(data, success, headers, config) {
							dfd.resolve(data);
						})
						.error(function(data, status, headers, config) {
							dfd.reject(status);
						});
					return dfd.promise;
				},


				getProjectsByUser : function(user) {
			
					var dfd = $q.defer();
					$http({method: 'GET', url: '/api/projectsByUser/' + user})
						.success(function(data, success, headers, config) {
							dfd.resolve(data);
						})
						.error(function(data, status, headers, config) {
							dfd.reject(status);
						});
					return dfd.promise;
				},

				getProjectsByGroup : function(group) {
					var dfd = $q.defer();
					$http({method: 'GET', url: '/api/projectsByGroup/' + group})
						.success(function(data, success, headers, config) {
							dfd.resolve(data);
						})
						.error(function(data, status, headers, config) {

							dfd.reject(status);
						});
					return dfd.promise;
				},

				viewProjectDetails : function(name) {
					var dfd = $q.defer();
					$http({method: 'GET', url:'/api/projects/viewProjectDetails/' + name})
						.success(function(data, status, headers, config){
							dfd.resolve(data);
						})
						.error(function(data, status, headers, config){
							dfd.reject(status);
						});
					return dfd.promise;
				},

				addProject : function(projectData) {
					var dfd = $q.defer();
					$http.post('/api/createProject', projectData)
						.success(function(data, status, headers, config) {
							project = data;
							dfd.resolve(data);
						})
						.error(function(response, status) {
							wFNotifier.error(response.reason);
							dfd.reject(status);
						});
					return dfd.promise;
				}, 

				addGroupToProject : function(groupToProjectData) {
					var dfd = $q.defer();
					$http.post('/api/addGroupToProject', groupToProjectData)
						.success(function(data, status, headers, config) {
							dfd.resolve(data);
						})
						.error(function(data, status, headers, config) {
							dfd.reject(status);
						});
					return dfd.promise;
				},

				removeProject : function(id) {
					var dfd = $q.defer();
					$http.post('/api/removeProject/' + id)
						.success(function(data, success, headers, config) {
							dfd.resolve(data);
						})
						.error(function(data, status, headers, config) {
							dfd.reject(status);
						});
					return dfd.promise;
				},

				updateProject : function(id) {
					var dfd = $q.defer();
					$http({method: 'PUT', url: '/api/updateProject/' + id})
						.success(function(data, status, headers, config) {
							dfd.resolve(data);
						})
						.error(function(data, status, headers, config) {
							dfd.reject(data);
						});
					return dfd.promise;
				},

				contributeToProject: function(id, amount, name) {
					var dfd = $q.defer();
					$http({method: 'PUT', url: '/api/projects/' + id, data:{amount: amount}})
						.success(function(data, status, headers, config) {
							wFNotifier.notify('Thanks. You\'ve just made a contribution of $' + amount + ' to project ' + name + ' was successfully recieved.');
							$location.path('/projects/' + id);
						})
						.error(function(data, status, headers, config){
							console.log(status);
						});
					return dfd.promise;
					
				}
		} 
	}]);