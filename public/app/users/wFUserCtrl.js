angular.module('app').controller('wFUserCtrl', function($scope) {
		$scope.users = ['User 1', 'User 2', 'User 3'];

	    $scope.addUser = function() {
	  	  var newUserNo = $scope.users.length + 1;
	      $scope.users.push('User ' + newUserNo);
	    }

	    $scope.userStatus = [
	    	{name: 'active', value: 'active'},
	    	{name: 'inactive', value: 'inactive'}
	    ];

	    $scope.setStatus = {type: $scope.userStatus[0].value};

	    $scope.status = {
	      isFirstOpen: true,
	      isFirstDisabled: false
	    };


});