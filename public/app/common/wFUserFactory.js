angular.module('app').factory('wFUserFactory', function($q, $http, $location, wFNotifier) {
	

	return {

		removeUserFromGroup : function(group_id, user_id) {
			var dfd = $q.defer();
			$http.post('/api/groups/' + group_id + '/' + user_id) 
				.success(function(data, success, headers, config) {
					dfd.resolve(data);
				})
				.error(function(data, success, headers, config) {
					dfd.reject(status);
				}); 
			return dfd.promise;
		},

		findUserByUsername : function(username) {
			var dfd = $q.defer();
			$http({method: 'GET', url: '/api/findUser/' + username})
				.success(function(data, status, headers, config) {
					if(data === 'No user found.') {
						wFNotifier.error('There is currently no user with that account on our records.');
					} else {
						wFNotifier.notify('Welcome back ' + data.firstname);
						$location.url('/dashboard');
					}
					dfd.resolve(data);

				})
				.error(function(data, success, headers, config) {
					dfd.reject(status);
				});
			return dfd.promise;
		},

		addUserToGroup : function() {
			console.log('add user');
		},

		updateUser : function(id) {
			console.log('update user');
		},

		viewUser : function(id) {
			console.log('view user');
		}
	}
});