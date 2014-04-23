angular.module('app').service('wFMailService', ['$http', '$q', function($http, $q) {

	return {

		getMail : function(){
			return $http({
				method: 'GET',
				url: '/api/mail'
			});
		},

		sendEmail : function(mail){
			var dfd = $q.defer();
			$http({
				method: 'POST',
				data: mail,
				url: '/api/send'
			}).success(function(data, status, headers) {
				dfd.resolve(data);
				console.log(data);
			}).error(function(data, status, headers) {
				dfd.reject(data);
			});
			return dfd.promise;
		}

	}
}]);