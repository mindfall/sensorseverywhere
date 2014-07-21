angular.module('app')
	.controller('wFSignUpToGroupCtrl', ['$scope', '$location', '$stateParams', 'wFUser', 'wFAuth', 'wFIdentity', 'wFUserFactory', 'wFGroupFactory', 'wFProjectFactory', 'wFNotifier', 'wFAuth', 
		function($scope, $location, $stateParams, wFUser, wFAuth, wFIdentity, wFUserFactory, wFGroupFactory, wFProjectFactory, wFNotifier, wFAuth){

			var gid = $stateParams.gid;
			var loggedIn = false;
			var groupProjects = [];
			var user = '';
			if(!loggedIn) {
				console.log('not logged in');
			} else {
				user = wFIdentity.currentUser;
				console.log(user);
			}

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

				var groupRole = {
					project: '',
					group: $scope.groupName,
					role: 'member'
				}
			
				wFAuth.authenticateUser(username, password).then(function(success){
					if(success){
						loggedIn = true;
						wFGroupFactory.updateUserStatus(userData).then(function() {
							wFUserFactory.updateUserGroupRole(groupRole).then(function() {
								wFNotifier.notify($scope.groupName  + ' has been added to your user profile.');
							});
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
					project: '',
					group: $scope.groupName,
					role: 'member'
					//usericon: $scope.usericon
				};

				var userData = {
					gid: gid,
					username: $scope.m_username
				}

				wFAuth.createUser(newUserData).then(function() {
					wFGroupFactory.updateUserStatus(userData).then(function() {
						wFNotifier.notify('You have signed up and are now a member of ' + $scope.groupName);
						$location.path('/dashboard');
					}, function(reason){
						wFNotifier.error(reason);
					});
				}, function(reason) {
					wFNotifier.error(reason);
				});
			}
}]);