angular.module('app')
	.factory('wFProjectFactory', function($rootScope, $http, $q, $routeParams, $location, wFNotifier){

		var mapData = [];
		var wildlifeData = [];

		return {
				setWildlifeData : function(wildlife) {
					wildlifeData = wildlife;
				},

				getWildlifeData : function() {
					return wildlifeData;
				},

				getProjects : function() {
					var dfd = $q.defer();
					$http({method: 'GET', url: '/api/projects'})
						.success(function(data, status, headers, config) {
							dfd.resolve(data);
						}).
						error(function(data, status, headers, config){
							dfd.reject(status);
						});
					return dfd.promise;

				}, 

				viewProjectDetails : function(id) {
					var dfd = $q.defer();
					$http({method: 'GET', url:'/api/projects/' + id})
						.success(function(data, status, headers, config){
							dfd.resolve(data);
						}).error(function(data, status, headers, config){
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
						.error(function(data, status, headers, config) {
							dfd.reject(status);
						});
					return dfd.promise;
				}, 

				contributeToProject: function(id, amount, name) {
					console.log(amount);
					var dfd = $q.defer();
					$http({method: 'PUT', url: '/api/projects/' + id, data:{amount: amount}})
						.success(function(data, status, headers, config) {
							wFNotifier.notify('Thanks. You\'ve just contribution of $' + amount + ' to project ' + name + ' was successfully recieved.');
							$location.path('/fund/' + id);
						})
						.error(function(data, status, headers, config){
							console.log(status);
						});
					return dfd.promise;
					
				},
		} 
	})