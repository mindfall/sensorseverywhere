angular.module('app')
	.controller('wFProfileCtrl', ['$scope', 'wFAuth', 'wFIdentity', 'wFNotifier', 
		function($scope, wFAuth, wFIdentity, wFNotifier){
		$scope.email = wFIdentity.currentUser.username;
		$scope.fname= wFIdentity.currentUser.firstname;
		$scope.lname = wFIdentity.currentUser.lastname;

		$scope.update = function(){
			var newUserData = {
				username: $scope.email,
				firstname: $scope.fname,
				lastname: $scope.lname
			}

			if($scope.password && $scope.password.length > 0){
				newUserData.password = $scope.password;
			}

			wFAuth.updateCurrentUser(newUserData).then(function(){
				wFNotifier.notify('Your user account has been updated.');
			}, function(reason){
				wFNotifier.error(reason);
			})
		}
	}]);