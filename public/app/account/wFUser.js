angular.module('app').factory('wFUser', ['$resource', function($resource){
	var UserResource = $resource('/api/users/:id', {_id: "@id"}, {update: {method: 'PUT', isArray: false}});

	UserResource.prototype.isAdmin = function(){
		return this.siteRole && this.siteRole.indexOf('admin') > -1;
	}

	UserResource.prototype.isOwner = function() {
		return this.roles && this.roles.indexOf('owner') > -1;
	}

	return UserResource;
}]);

