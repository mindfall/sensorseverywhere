angular.module('app').factory('wFTaskFactory', ['$http', '$q', '$location', 'wFNotifier', 
	function($http, $q, $location, wFNotifier) {

		return {
			addTaskToProject: function(taskData){
				console.log(taskData);
				var dfd = $q.defer();
				$http.post('/api/addTaskToProject', taskData)
					.success(function(data, status, headers, config) {
						dfd.resolve();
					})
					.error(function(data, status, headers, config) {
						dfd.reject();
					});
				return dfd.promise;
			}
		}
}]);