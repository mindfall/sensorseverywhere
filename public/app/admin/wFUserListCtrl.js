angular.module('app')
	.controller('wFUserListCtrl', function($scope, wFUser){
		$scope.users = wFUser.query();
		console.log($scope.users);
})
