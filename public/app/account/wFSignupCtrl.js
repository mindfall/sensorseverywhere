angular.module('app')
			.controller('wFSignupCtrl', function($scope, wFUser, wFNotifier, $location, wFAuth){

				$scope.signup = function() {
				
					var newUserData = {
						username: $scope.email,
						password: $scope.password,
						firstname: $scope.fname,
						lastname: $scope.lname
					};
					wFAuth.createUser(newUserData).then(function(){
						wFNotifier.notify('User account created!');
						$location.path('/');
					}, function(reason) {
						wFNotifier.error(reason);
					});
				}

})