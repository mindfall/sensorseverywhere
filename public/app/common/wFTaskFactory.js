angular.module('app')
	.factory('wFTaskFactory', ['$http', '$q', '$location', 'wFNotifier',
		function($http, $q, $location, wFNotifier) {

		return {
			addTaskToProject: function(taskData){
				var dfd = $q.defer();
				$http.post('/api/addTaskToProject', taskData)
					.success(function(data, status, headers, config) {
						dfd.resolve();
					})
					.error(function(data, status, headers, config) {
						dfd.reject();
					});
				return dfd.promise;
			},

			removeTaskFromProject: function(pid, name){
				var dfd = $q.defer();
				$http.post('/api/removeTaskFromProject/' + pid + '/' + name )
					.success(function(data, status, headers, config){
						dfd.resolve();
					})
					.error(function(data, status, headers, config) {
						dfd.reject();
					});
				return dfd.promise;
			},		
		

			findActiveGroupMembers: function(project) {
				var activeUsers = [];
				var activeMembers = [];
				var dfd = $q.defer();
				$http({method: 'GET', url: '/api/findActiveMembers/' + project})
					.success(function(data, success, headers, config) {
						dfd.resolve(data);
					}).
					error(function(data, status, headers, config) {
						dfd.reject(status);
					});
				return dfd.promise;

			}
	}
}]);