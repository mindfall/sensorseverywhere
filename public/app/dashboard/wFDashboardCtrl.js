angular.module('app').controller('wFDashboardCtrl', 
                                ['$scope', '$location', 'wFIdentity', 'wFProjectFactory', 
                        function($scope, $location, wFIdentity, wFProjectFactory) {

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

        $scope.toggleGroupForm = function() {
          $scope.groupForm = !$scope.groupForm;
          $scope.groupList = !$scope.groupList;
        }

        $scope.toggleUserForm = function(state) {
          $scope.userForm != $scope.userForm;
/*          if(state === 'show') {
            $scope.userForm = true;
            return $scope.userForm;
          } else if(state === 'hide') {
            $scope.userForm = false;
            return $scope.userForm;
          }*/
        }
}]);