angular.module('app').factory('wFUser', function($resource){
	var UserResource = $resource('/api/users/:id', {_id: "@id"}, {update: {method: 'PUT', isArray: false}});

	UserResource.prototype.isAdmin = function(){
		return this.roles && this.roles.indexOf('admin') > -1;
	}

	UserResource.prototype.isOwner = function() {
		return this.roles && this.roles.indexOf('owner') > -1;
	}

	return UserResource;
});

