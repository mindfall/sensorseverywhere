angular.module('app').controller('wFDashboardCtrl', 
                                ['$scope', '$location', 'wFIdentity', 'wFProjectFactory', 
                        function($scope, $location, wFIdentity, wFProjectFactory) {

    	var getUserProjects = [];
    	var userProjects = [];
      var user = wFIdentity.currentUser;
      $scope.buttonLabel = 'Create Group';

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

          if($scope.groupForm === true ) {
            $scope.buttonLabel = 'Create Group';

          } else if($scope.groupForm === false ) {
            $scope.buttonLabel = 'Show Groups';
            $scope.buttonLabel = 'Create Groups';
          }

          $scope.groupForm = !$scope.groupForm;
          $scope.groupList = !$scope.groupList;

        }

        $scope.toggleUserForm = function(state) {
          $scope.userForm != $scope.userForm;
        }
}]);