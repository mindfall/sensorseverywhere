angular.module('app').controller('wFEmailContentCtrl', ['$scope', '$rootScope', 'wFMailService', function($scope, $rootScope, wFMailService){
	
	$scope.showingReply = false;
	$scope.reply = {};

	$scope.toggleEmailReply = function(){
		$scope.showingReply = !$scope.showingReply;
		$scope.reply = {};
		$scope.reply.to = $scope.selectedMail.from;/*.from.join(", ");*/
		console.log($scope.reply.to);
		$scope.reply.body = "\n\n---------------------\n\n" + $scope.selectedMail.body;
	}

	$scope.sendReply = function(){
		$scope.showingReply = false;
		$rootScope.loading = true;
		wFMailService.sendEmail($scope.reply)
			.then(function(status){
				$rootScope.loading = false;
			}, function(err){
				$rootScope.loading = false;
			});
	}

	$scope.sendInvite = function() {
		wFMailService.sendEmail($scope.invite) 
			.then(function(status) {
				console.log(status);
			}, function(err) {
				console.log(status);
			});
	}

	$scope.$watch('selectedMail', function(evt){
		$scope.showingReply = false;
		$scope.reply = {};
	});
}]);