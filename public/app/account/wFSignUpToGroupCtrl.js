angular.module('app')
	.controller('wFSignUpToGroupCtrl', ['$scope', '$location', '$stateParams', 'wFUser', 'wFAuth', 'wFUserFactory', 'wFGroupFactory', 'wFNotifier', 'wFAuth', 
		function($scope, $location, $stateParams, wFUser, wFAuth, wFUserFactory, wFGroupFactory, wFNotifier, wFAuth){

			var gid = $stateParams.gid;

			wFGroupFactory.getGroupById(gid).then(function(data) {
				$scope.groupName = data.groupName;
			}, function(reason) {
				console.log(reason);
			});

		$scope.groupSignIn = function(username, password) {

				var userData = {
					gid: gid, 
					username: $scope.username
				};
			
				wFAuth.authenticateUser(username, password).then(function(success){
					if(success){
						var loggedIn = true;
						wFGroupFactory.updateUserStatus(userData).then(function() {
							wFNotifier.notify('You are now a member of ' + $scope.groupName);
							$location.path('/dashboard');	
						}, function(reason){
							wFNotifier.error(reason);
						});
					} else {
						wFNotifier.error('Username/Password combination incorrect.');
					}
				});
			}

			$scope.groupSignUp = function() {

				var newUserData = {
					username: $scope.m_username,
					password: $scope.m_password,
					firstname: $scope.m_fname,
					lastname: $scope.m_lname,
					roles: 'member'
					//usericon: $scope.usericon
				};
				console.log(newUserData);
				wFAuth.createUser(newUserData).then(function() {
					wFNotifier.notify('User account created!');
					$location.path('/dashboard');
	
				}, function(reason) {
					wFNotifier.error(reason);
				});
			}
}]);