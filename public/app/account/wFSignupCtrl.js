angular.module('app')
			.controller('wFSignupCtrl', function($scope, wFUser, wFNotifier, $location, wFAuth){

				$scope.selectRole = [
					{name: 'owner', value: 'owner'},
					{name: 'contributor', value: 'contributor'}
				];
				$scope.roles = {type: $scope.selectRole[0].value};
				$scope.usericon = "";

				$scope.signup = function() {
				
					var newUserData = {
						username: $scope.email,
						password: $scope.password,
						firstname: $scope.fname,
						lastname: $scope.lname,
						roles: $scope.roles.type
						//usericon: $scope.usericon
					};

					console.log(newUserData);

					wFAuth.createUser(newUserData).then(function(){
						wFNotifier.notify('User account created!');
						$location.path('/');
					}, function(reason) {
						wFNotifier.error(reason);
					});
				}

})