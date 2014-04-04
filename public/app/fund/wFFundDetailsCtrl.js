angular.module('app').controller('wFFundDetailsCtrl', function($scope, $routeParams, wFProjectFactory){

	var viewProject = {};
	
	viewProject = wFProjectFactory.viewProjectDetails($routeParams.id);

	viewProject.then(function(viewProject){
		console.log(viewProject);
		$scope.viewProject = viewProject;
	}, function(status){
		console.log(status);
	});

});