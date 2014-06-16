angular.module('app')
	.controller('wFUserCtrl', ['$scope', 'wFUserFactory', 'wFMailService', 'wFNotifier', 
		function($scope, wFUserFactory, wFMailService, wFNotifier) {

		    $scope.userStatus = [
		    	{name: 'not sent', value: 'not sent'},
		    	{name: 'accepted', value: 'accepted'},
		    	{name: 'pending', value: 'pending'},
		    	{name: 'declined', value: 'declined'}
		    ];

		    $scope.setStatus = {type: $scope.userStatus[0].value};
		    $scope.emailButtonValue = 'Invite';


		    $scope.addInvite = {
				id: $scope.users.length + 1,
				priority: 0,
				email: "Enter email...",
				name: "Enter name...",
				setStatus: $scope.userStatus[0].value,
				emailButtonValue: 'Invite'
			};

		    $scope.removeUserFromGroup = function(index) {
		    	$scope.users.splice(index, 1);
		    }



		    $scope.accordianMenu = {
		      isFirstOpen: true,
		      isFirstDisabled: false
		    };

		    $scope.sendInvite = function(email, name, gid, group, project) {
		    	wFMailService.sendInvite(email, name, gid, group, project) 
					.then(function(response) {
						if(response) {
							$scope.invite.email = '';
							$scope.invite.name = '';
							wFNotifier.notify('Email successfully sent.')
						}

					}, function(err) {
						console.log(status);
				});
			}

}]);