angular.module('app')
	.controller('wFNavBarLoginCtrl', ['$scope', '$http', '$location', '$timeout', 'wFNotifier', 'wFIdentity', 'wFAuth', 
		function($scope, $http, $location, $timeout, wFNotifier, wFIdentity, wFAuth){


		$scope.identity = wFIdentity;
		$scope.signin = function(username, password){
			wFAuth.authenticateUser(username, password).then(function(success){
				if(success){
					wFNotifier.notify('You have successfully signed in!');
					var loggedIn = true;
					$location.path('/dashboard')
				} else {
					wFNotifier.error('Username/Password combination incorrect.');
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

		$scope.mobileMenu = function() {
			alert('some');
		}
}]);