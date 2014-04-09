angular.module('app')
	.controller('wFNavBarLoginCtrl', function($scope, $http, wFNotifier, wFIdentity, wFAuth, $location){

		$scope.identity = wFIdentity;
		$scope.signin = function(username, password){
			wFAuth.authenticateUser(username, password).then(function(success){
				if(success){
					wFNotifier.notify('You have successfully signed in!');
					var loggedIn = true;
					$location.path('/main')
				} else {
					wFNotifier.notify('Username/Password combination incorrect.');
				}
			});
			

		}
		$scope.signout = function(){
			wFAuth.logoutUser().then(function(){
				$scope.username = "";
				$scope.password = "";
				wFNotifier.notify('You have successfully signed out!');
				$location.path('/');
			})
		}
});