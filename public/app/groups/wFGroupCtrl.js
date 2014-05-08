angular.module('app').controller('wFGroupCtrl', function($scope, $location) {
	$scope.message = "There are currently no groups to display."

	$scope.createGroup = function() {
		console.log('create group');
		$location.url('/groups/create-group')
	}

/*	$scope.createProject = function() {
	    $location.url('/projects/create-project');
	 }*/
});