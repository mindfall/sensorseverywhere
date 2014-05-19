angular.module('app').service('wFMailService', ['$http', '$q', function($http, $q) {

	return {

		getMail : function(){
			return $http({
				method: 'GET',
				url: '/api/mail'
			});
		},

		sendInvite : function(email, name, groupId, project){

			var invite = {
				email : email, 
				name : name,
				gid : groupId,
				project : project
			};
			var dfd = $q.defer();
			$http({
				method: 'POST',
				data: invite,
				url: '/api/sendInvite/' 
			}).success(function(data, status, headers) {
				dfd.resolve(data);
			}).error(function(data, status, headers) {
				dfd.reject(data);
			});
			return dfd.promise;
		}

	}
}]);