angular.module('app').factory('wFAuth', function($http, wFIdentity, $q, wFUser){
	return {
		authenticateUser: function(username, password){
			var dfd = $q.defer();
			$http.post('/login', {username:username, password:password}).then(function(response){
				if(response.data.success){
					var user = new wFUser();
					angular.extend(user, response.data.user)
					wFIdentity.currentUser = user;
					dfd.resolve(true);
				} else {
					dfd.resolve(false);
				}
			});
			return dfd.promise;
		}, 
		
		createUser: function(newUserData){
			var newUser = new wFUser(newUserData);
			console.log(newUser);
			var dfd = $q.defer();

			newUser.$save().then(function(){
				wFIdentity.currentUser = newUser;
				dfd.resolve();
			}, function(response){
				dfd.reject(response.data.reason);
			});

			return dfd.promise;
		},

		updateCurrentUser: function(newUserData){
			var dfd = $q.defer();

			var clone = angular.copy(wFIdentity.currentUser);
			angular.extend(clone, newUserData);
			clone.$update().then(function(){
				wFIdentity.currentUser = clone;
				dfd.resolve();
			}, function(response){
				dfd.reject(response.data.reason);
			});
			return dfd.promise;
		},

		logoutUser: function(){
			var dfd = $q.defer();
			$http.post('/logout', {logout:true}).then(function(){
				wFIdentity.currentUser = undefined;
				dfd.resolve();
			});
			return dfd.promise;
		}, 

		authorizeCurrentUserForRoute: function(role){
			if(wFIdentity.isAuthorized(role)){
				return true;
			} else {
				return $q.reject('not authorized');
			}
		},

		authorizeAuthenticatedUserForRoute: function(){
			if(wFIdentity.isAuthenticated()){
				return true;
			} else {
				return $q.reject('not authorized');
			}
		}
	}

});