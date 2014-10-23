
angular.module('app').factory('wFIdentity', ['$window', 'wFUser', function($window, wFUser){
	var currentUser;

	if(!!$window.wFbootstrappedUserObject){
		currentUser = new wFUser();
		angular.extend(currentUser, $window.wFbootstrappedUserObject);
	}
	return {
		currentUser: currentUser, 
		isAuthenticated: function(){
			return !!this.currentUser;
		}, 
		isAuthorized: function(role){
			return !!this.currentUser && this.currentUser.siteRole.indexOf(role) > -1;
		}
	}
}]);

