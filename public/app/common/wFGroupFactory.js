angular.module('app')
	.factory('wFGroupFactory', function($rootScope, $http, $q, $location, wFNotifier){

		var groupData = [];


		return {

				// universal group list
				getGroups : function() {
					var dfd = $q.defer();
					$http({method: 'GET', url: '/api/groups'})
						.success(function(data, status, headers, config) {
							//console.log(data);
							dfd.resolve(data);
						}).
						error(function(data, status, headers, config) {
							dfd.reject(status);
						});
					return dfd.promise;

				},

				getGroupsByUser : function(user_id) {
					var dfd = $q.defer();
					$http({method: 'GET', url: '/api/groupsByUser/' + user_id})
						.success(function(data, success, headers, config) {
							dfd.resolve(data);
						}).
						error(function(data, status, headers, config) {
							dfd.reject(status);
						});
					return dfd.promise;
				},

				viewGroupDetails : function(id) {
					var dfd = $q.defer();
					$http({method: 'GET', url:'/api/groups/' + id})
						.success(function(data, status, headers, config){
							dfd.resolve(data);
						}).error(function(data, status, headers, config){
							dfd.reject(status);
						});
					return dfd.promise;
				},

				addGroup : function(groupData) {
					var dfd = $q.defer();
					$http.post('/api/createGroup', groupData)
						.success(function(data, status, headers, config) {
							group = data;
							dfd.resolve(data);
						})
						.error(function(data, status, headers, config) {
							dfd.reject(status);
						});
					return dfd.promise;
				}, 

				removeGroup : function(id) {
					var dfd = $q.defer();
					$http.post('/api/removeGroup/' + id)
						.success(function(data, success, headers, config) {
							dfd.resolve(data);
						})
						.error(function(data, status, headers, config) {
							dfd.reject(status);
						});
					return dfd.promise;
				},



			/*	contributeToProject: function(id, amount, name) {
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
					
				},*/
		} 
	})