angular.module('app')
	.controller('wFUserListCtrl', ['$scope', 'wFUser', 
		function($scope, wFUser){
		$scope.users = wFUser.query();
		console.log($scope.users);
}]);
