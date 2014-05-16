angular.module('app').controller('wFUserCtrl', function($scope, wFUserFactory) {
	//	$scope.users = ['User 1', 'User 2', 'User 3'];
	//	var newUserNo = [];

		$scope.users = {
			firstname  : 'Enter name...',
		};

	    $scope.addUserToGroup = function() {
	//  	  newUserNo = $scope.users.length + 1;
	//      $scope.users.push('User ' + newUserNo);
	      var addUser = wFUserFactory.addUserToGroup();

	    }

	    $scope.removeUserFromGroup = function(gid, uid) {
	    	console.log($scope.users);
/*	    	console.log(gid + '   ' + uid);
	    	var removeUser = wFUserFactory.removeUserFromGroup(gid, uid);
	    	removeUser.then(function(removeUser) {
	    		var id = $scope.users[0]._id;
	    		$scope.users.splice(id, 1);
	    	}, function(status) {
	    		console.log(status);
	    	});*/
	    }

	    $scope.userStatus = [
	    	{name: 'online', value: 'online'},
	    	{name: 'offline', value: 'offline'},
	    	{name: 'pending', value: 'pending'}
	    ];

	    $scope.setStatus = {type: $scope.userStatus[0].value};

	    $scope.accordianMenu = {
	      isFirstOpen: true,
	      isFirstDisabled: false
	    };


});