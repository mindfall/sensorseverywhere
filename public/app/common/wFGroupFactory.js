angular.module('app')
	.factory('wFGroupFactory', function($rootScope, $http, $q, $location, wFNotifier){

		var groupData = [];
		var callNumber = 0;
		var users = [];

		return {

				// universal group list
				getGroups : function() {
					var dfd = $q.defer();
					$http({method: 'GET', url: '/api/groups'})
						.success(function(data, status, headers, config) {
						//	console.log(data);
							dfd.resolve(data);
						}).
						error(function(data, status, headers, config) {
							dfd.reject(status);
						});
					return dfd.promise;

				},

				getGroupById : function(id) {
					var dfd = $q.defer();
					$http({method: 'GET', url: '/api/groupById/' + id})
						.success(function(data, success, headers, config) {
							dfd.resolve(data);
						})
						.error(function(data, status, headers, config) {
							dfd.reject(status);
						});
					return dfd.promise;
				},


				getGroupsByUser : function(username) {
					var dfd = $q.defer();
					$http({method: 'GET', url: '/api/groupsByUser/' + username})
						.success(function(data, success, headers, config) {
							if(callNumber === 0) {
								dfd.resolve(data);
								for(var i = 0; i < data.length; i++) {
									for(var j = 0; j < data[i].groupMembers.length; j++) {
					                  var usersInGroup = {
					                        priority: 0,
					                        email: data[i].groupMembers[j].email,
					                        name: data[i].groupMembers[j].username,
					                        setStatus: data[i].groupMembers[j].status,
					                        emailButtonValue: 'Email'
					                  }
					                  users.push(usersInGroup);
					                }
				            	}
								callNumber++;
							}
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

				addUserToGroup : function(userData) {
					var dfd = $q.defer();
					$http.post('/api/addUserToGroup', userData)
						.success(function(data, succcess, headers, config) {
							dfd.resolve(data);
						//	console.log(data);
						})
						.error(function(data, status, headers, config) {
							dfd.reject(status);
						});
					return dfd.promise;
				},

				updateUserStatus : function(userData) {
					console.log(userData);
					var dfd = $q.defer();
					//$http({method: 'PUT', url: '/api/projects/' + id, data:{amount: amount}})
					$http({method: 'PUT', url: '/api/updateUserStatus/' + userData, data:{gid: userData.gid, username: userData.username}})
						.success(function(data, success, headers, config) {
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
});



