angular.module('app')
	.controller('wFContributionCtrl', ['$scope','$stateParams','$location','wFProjectFactory','wFIdentity','wFNotifier',
		function($scope, $stateParams, $location, wFProjectFactory, wFIdentity, wFNotifier){

	$scope.contribution = '';
	$scope.contributeForm = true;
	$scope.creditCardForm = false;

	var userIsLoggedIn = wFIdentity.isAuthenticated();
	if(userIsLoggedIn == true){
		console.log('signed in');
    	$scope.isLoggedIn = userIsLoggedIn;
   	} else {
   		wFNotifier.notify('You must be signed in to access this page.');
   		$location.path('/signup');
   		//console.log('You must be signed in to access this page.');
   	}
	
	var cc_number = $scope.number;			
	var cc_expiry = $scope.expiry;
	var cc_csv = $scope.cvc;

	$scope.project_id = $stateParams.id;

	var contribute = wFProjectFactory.getProjectById($stateParams.id);

	contribute.then(function(contribute){
		console.log(contribute);
		$scope.project_name = contribute.project_name;
	}, function(status){
		console.log(status);
	});

	$scope.contributionAmount = function(amount) {
		$scope.contribution = amount;
		$scope.contributeForm = false;
		$scope.creditCardForm = true;
	}

	$scope.changeContribution = function() {
		$scope.c_amount = '';
		$scope.creditCardForm = false;
		$scope.contributeForm = true;
	}

	$scope.stripeCallback = function(code, result) {
		console.log('Youre contributing ' + $scope.contribution + ' to project ' + $scope.project_id);
		if(result.error) {
			console.log('It failed: ' + result.error.message);
		} else {
			console.log('Success: ' + result.id);
		}
		var sendToken = wFProjectFactory.makePayment(result.id, $scope.contribution, $scope.project_id);
		sendToken.then(function(tokenResponse){
			$scope.message = tokenResponse;
		}, function(status) {
			console.log(status);
		});
	//	console.log("Thanks for contributing " + amount + ", your cc will be debited upon success of the funding application.");
	//	$location.url('/fund/' + $stateParams.id);
	};



}]);