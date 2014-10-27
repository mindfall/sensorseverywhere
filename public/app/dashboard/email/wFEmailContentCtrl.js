angular.module('app')
	.controller('wFEmailContentCtrl', ['$scope', '$rootScope', '$location', 'wFMailService', 'wFNotifier',
		function($scope, $rootScope, $location, wFMailService, wFNotifier){
		
		$scope.showingReply = false;
		$scope.reply = {};
		$scope.enquiry = {};

		var submissionCounter = 1;

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


	    $scope.sendEnquiry = function(name, email) {
	    	
	    	if(submissionCounter === 1 && name !== undefined && name !== null && name !==  '' && email !== undefined && email !== null && email !==  '') {
	    			//used so only one email is sent
	    			submissionCounter++;
					wFMailService.sendEnquiry(name, email) 
					.then(function(response) {
						if(response) {
							$scope.enquiry.email = '';
							$scope.enquiry.name = '';
							wFNotifier.notify('Email successfully sent.')
						}
						$scope.$watch('showSplash', function(){
							$scope.showSplash = false;
						});

					}, function(err) {
						console.log(status);
				});
	    	}
		}

		 $scope.sendMessage = function(name, email, message) {
	    	
	    	if(submissionCounter === 1 && name !== undefined && name !== null && name !==  '' && 
	    								  email !== undefined && email !== null && email !==  '' &&
	    								  message !== undefined && message !== null && message !==  '') {
	    			//used so only one email is sent
	    			submissionCounter++;
					wFMailService.sendMessage(name, email, message) 
					.then(function(response) {
						if(response) {
							$scope.contact.email = '';
							$scope.contact.name = '';
							$scope.contact.message = '';
							wFNotifier.notify('Email successfully sent.')
						}

					}, function(err) {
						console.log(status);
				});
	    	}
		}

/*		$scope.showSplash = function() {
			return false;
		}*/

		$scope.$watch('selectedMail', function(evt){
			$scope.showingReply = false;
			$scope.reply = {};
		});


}]);