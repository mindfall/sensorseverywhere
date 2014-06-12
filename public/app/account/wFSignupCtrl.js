angular.module('app')
	.controller('wFSignupCtrl', ['$scope', '$location', '$stateParams', 'wFUser', 'wFGroupFactory', 'wFNotifier', 'wFAuth', 
		function($scope, $location, $stateParams, wFUser, wFGroupFactory, wFNotifier, wFAuth){

			var gid = $stateParams.gid;

			wFGroupFactory.getGroupById(gid).then(function(data) {
				$scope.groupName = data.groupName;
			}, function(reason) {
				console.log(reason);
			});

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

				wFAuth.createUser(newUserData).then(function(){
					wFNotifier.notify('User account created!');
					$location.path('/');
				}, function(reason) {
					wFNotifier.error(reason);
				});
			}

			$scope.signupToGroup = function() {

				var userData = {
					gid: gid,
					username: $scope.fname,
					email: $scope.email
				};

/*				wFAuth.createUser(userData).then(function(){
					wFNotifier.notify('Welcome ' + $scope.fname +'!');
					$location.path('/');
				}, function(reason) {
					wFNotifier.error(reason);
				});*/

				wFGroupFactory.updateUserStatus(userData).then(function() {
					wFNotifier.notify('Your account is now active.')	
				}, function(reason){
					wFNotifier.error(reason);
				});

			}

}]);