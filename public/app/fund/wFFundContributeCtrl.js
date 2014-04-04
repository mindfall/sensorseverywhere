angular.module('app').controller('wFFundContributeCtrl', function($scope, $routeParams, $location, wFProjectFactory, wFIdentity, wFNotifier){


	var userIsLoggedIn = wFIdentity.isAuthenticated();
	if(userIsLoggedIn == true){
		console.log('signed in');
    	$scope.isLoggedIn = userIsLoggedIn;
   	} else {
   		wFNotifier.notify('You must be signed in to access this page.');
   		$location.path('/signup');
   		//console.log('You must be signed in to access this page.');
   	}
	
//	var contribute = [];
	var cc_name = $scope.name;
	var cc_amount = $scope.amount;
	var cc_number = $scope.cc_number;			
	var cc_exp_month = $scope.cc_exp_month;
	var cc_exp_year = $scope.cc_exp_year;
	var cc_csv = $scope.cc_csv;

	$scope.project_id = $routeParams.id;

	var contribute = wFProjectFactory.viewProjectDetails($routeParams.id);

	contribute.then(function(contribute){
		$scope.project_name = contribute.project_name;
	}, function(status){
		console.log(status);
	});


	$scope.contribution = function(amount, name) {
		var contribtionAmount = wFProjectFactory.contributeToProject($routeParams.id, amount, name);

		contribtionAmount.then(function(contribtionAmount){
			console.log('The amount you have contributed is: ' + contributionAmount);
		}, function(status){
			console.log(status);
		});
	//	console.log("Thanks for contributing " + amount + ", your cc will be debited upon success of the funding application.");
	//	$location.url('/fund/' + $routeParams.id);
	}


});