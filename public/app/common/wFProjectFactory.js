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

				addProject : function(projectData){
/*					console.log('wFProjectFactory' + projectData);
					console.log(projectData.project_owner);
					console.log(projectData.project_name);
					console.log(projectData.project_description);
					console.log(projectData.project_start);
					console.log(projectData.project_type);
					console.log(projectData.project_funding_required);
					console.log(projectData.project_wildlife);
					console.log(projectData.project_location);*/

					var dfd = $q.defer();
					$http.post('/api/createProject', projectData)
						.success(function(data) {
							project = data;
							console.log('project: ' + JSON.stringify(project));
						})
						.error(function(data) {
							console.log('Error: ' + projectData);
						});
					return dfd.promise;
				}
		} 
	})