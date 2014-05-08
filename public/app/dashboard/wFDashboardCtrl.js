angular.module('app').controller('wFDashboardCtrl', function($scope, $location, wFIdentity, wFProjectFactory) {


	var getUserProjects = [];
	var userProjects = [];

  $scope.identity = wFIdentity;

	var userIsLoggedIn = wFIdentity.isAuthenticated();
	if(userIsLoggedIn === true){
    	$scope.isLoggedIn = userIsLoggedIn;
    	$scope.user = wFIdentity.currentUser;
    //	console.log(wFIdentity.currentUser._id);
		getUserProjects = wFProjectFactory.getProjectsByUser(wFIdentity.currentUser._id);
		getUserProjects.then(function(getUserProjects){
			for(var i = 0; i < getUserProjects.length; i++){
				userProjects.push(getUserProjects[i]);
			}
			$scope.projects = userProjects;
		}, function(status){
			console.log(status);
		});
   	}else{
   		$location.url('/');
   	}

   	$scope.removeProject = function(id) {
  		var removeProject = wFProjectFactory.removeProject(id);
   		removeProject.then(function(removeProject) {
    		var id = $scope.projects[0]._id;
   			$scope.projects.splice(id, 1);
   		}, function(status) {
   			console.log(status)
   		});
   	}

    $scope.createProject = function() {
      $location.url('create');
    }
});