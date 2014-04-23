angular.module('app').factory('wFSocketIOFactory', function($rootScope){
	var socket = io.connect();
	/*console.log(socket);*/
	return {
		on: function(eventName, callback) {
			socket.on(eventName, function(){
				var args = arguments;
				$rootScope.$apply(function(){
					callback.apply(socket, args);
				});
			});
		},
		emit: function(eventName, data, callback) {
			socket.emit(eventName, data, function(){
				var args = arguments;
				console.log('emit: ' + eventName);
				$rootScope.$apply(function () {
					if(callback) {
						callback.apply(socket, args);
					}
				});
			})
		}
	};
});