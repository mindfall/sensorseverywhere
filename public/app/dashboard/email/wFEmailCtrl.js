angular.module('app').controller('wFEmailCtrl', ['$scope', 'wFMailService', function($scope, wFMailService){

	$scope.email = [];

	wFMailService.getMail()
		.success(function(data, status, headers){
			$scope.email = data;
			console.log('get mail');
	})
		.error(function(data, status, headers){
			console.log('There was a problem retrieving the mail.')
	});
}]);