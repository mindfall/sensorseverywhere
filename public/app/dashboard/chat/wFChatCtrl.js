angular.module('app')
	.controller('wFChatCtrl', ['$scope', 'wFSocketIOFactory', 'wFIdentity',
		function($scope, wFSocketIOFactory, wFIdentity){
		
		$scope.user = wFIdentity.currentUser.firstname;

		var socket = wFSocketIOFactory;

		socket.on('init', function(data){
			$scope.name = data.name;
			$scope.users = data.users;
		});

		socket.on('send:message', function(message){
			$scope.messages.push(message);
			console.log('socket on: ' + $scope.message);
		});

	/*	socket.on('user:join', function(data){
			$scope.messages.push({
				user: 'chatroom',
				text: 'User' + data.name + 'has joined.'
			});
			$scope.users.push(data.name);
		});

		socket.on('user:left', function(data){
			$scope.messages.push({
				user: 'chatroom',
				text: 'User' + data.name + 'has left.'
			});
			var i, user;
			for (i = 0; i < $scope.users.length; i++) {
				user = $scope.users[i];
				if(user === data.name) {
					$scope.users.splice(i, 1);
					break;
				}
			}
		});*/

		$scope.messages = [];

		$scope.sendMessage = function() {
			
			var message = {
				message: $scope.message
			}

			socket.emit('send:message', message);

			$scope.messages.push({
				user: $scope.user,
				text: $scope.message
			});
			console.log($scope.messages);
			$scope.message = '';
		} 

}]);

