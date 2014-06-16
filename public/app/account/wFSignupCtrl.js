angular.module('app')
	.controller('wFSignupCtrl', ['$scope', '$location', '$stateParams', 'wFAuth', 'wFGroupFactory', 'wFNotifier', 
		function($scope, $location, $stateParams, wFAuth, wFGroupFactory, wFNotifier){

			var gid = $stateParams.gid;

			wFGroupFactory.getGroupById(gid).then(function(data) {
				$scope.groupName = data.groupName;
			}, function(reason) {
				console.log(reason);
			});

/*			$scope.selectRole = [
				{name: 'owner', value: 'owner'},
				{name: 'contributor', value: 'contributor'}
			];
			$scope.roles = {type: $scope.selectRole[0].value};*/
			$scope.usericon = "";

			$scope.signup = function() {
			
				var newUserData = {
					username: $scope.email,
					password: $scope.password,
					firstname: $scope.fname,
					lastname: $scope.lname,
					roles: 'owner'
					//usericon: $scope.usericon
				};

				wFAuth.createUser(newUserData).then(function() {
					wFNotifier.notify('User account created!');
					$location.path('/dashboard');
	
				}, function(reason) {
					wFNotifier.error(reason);
				});
			}

	

}]);