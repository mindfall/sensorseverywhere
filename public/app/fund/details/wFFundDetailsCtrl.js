angular.module('app').controller('wFFundDetailsCtrl', function($scope, $stateParams, wFProjectFactory){

	var viewProject = {};
	
	viewProject = wFProjectFactory.viewProjectDetails($stateParams.id);

	viewProject.then(function(viewProject){
		console.log(viewProject);
		$scope.viewProject = viewProject;
	}, function(status){
		console.log(status);
	});

});