angular.module('app')
	.factory('wFProjectFactory', function($rootScope, $http, $q){

		var mapData = [];
		var wildlifeData = [];

		return {
				getProjects : function(){
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

				setWildlifeData : function(wildlife){
					wildlifeData = wildlife;
				},

				getWildlifeData : function(){
					return wildlifeData;
				},

				addProject : function(){
					var dfd = $q.defer();
					$http.post('api/projectAdd')
						.success(function(data) {
					
							project = data;
							console.log(data);
					})
					.error(function(data) {
						console.log('Error: ' + data);
					});
				}
		} 
	})