angular.module('app')
	.controller('wFMainCtrl', function($scope, wFIdentity){


	var userIsLoggedIn = wFIdentity.isAuthenticated();

	if(userIsLoggedIn == true){
    	$scope.isLoggedIn = userIsLoggedIn;
    	console.log('The user is: ' + $scope.isLoggedIn);
   	}

	});