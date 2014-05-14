angular.module('app').controller('wFDashboardCtrl', function($scope, $location, wFIdentity, wFProjectFactory) {


	var getUserProjects = [];
	var userProjects = [];
  var user = wFIdentity.currentUser;

  $scope.message = '';

	var userIsLoggedIn = wFIdentity.isAuthenticated();
	if(userIsLoggedIn === true){
    	$scope.isLoggedIn = userIsLoggedIn;
    	$scope.user = user;
   	}else{
   		$location.url('/');
   	}

    $scope.createProject = function() {
      $location.url('create-project');
    }

    $scope.toggleGroupForm = function(state) {
      if(state === 'show') {
        $scope.groupForm = true;
        $scope.groupList = false;
        return $scope.groupForm, $scope.groupList;
      } else if(state === 'hide') {
        $scope.groupForm = false; 
        $scope.groupList = true;
        return $scope.groupForm, $scope.groupList;
      }
    }
});