angular.module('app').controller('wFDashboardCtrl', 
                                ['$scope', '$location', '$q', '$http', 'wFIdentity', 'wFProjectFactory', 'wFGroupFactory',
                        function($scope, $location, $q, $http, wFIdentity, wFProjectFactory, wFGroupFactory) {

    	var getUserProjects = [];
    	var userProjects = [];
      var getUserGroups = [];
      var userGroups = [];
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

          if($scope.groupForm === false ) {
            $scope.buttonLabel = 'Create Group';

          } else if($scope.groupForm === true ) {
            $scope.buttonLabel = 'Show Groups';
          }

          $scope.groupForm = !$scope.groupForm;
          $scope.groupList = !$scope.groupList;

        }
        
        $scope.getFiles = function(name, type) {
          console.log(name + ' ' + type);
          var dfd = $q.defer();
          $http({method: 'GET', url: '/api/'+type+'Files/' + name})
            .success(function(data, success, headers, config) {
              dfd.resolve(data);
              $scope.groupImage = data;
              console.log($scope.groupImage);
            }).
            error(function(data, status, headers, config) {
              dfd.reject(status);
              $scope.msg = 'There are no ' + type + 'files to display.';
          });
          return dfd.promise;
        } 


        $scope.getGroupsByUser = function() {
          getUserGroups = wFGroupFactory.getGroupsByUser(user._id);

          getUserGroups.then(function(getUserGroups){
            if(getUserGroups.length === 0) {
              $scope.message = 'There are currently no groups to display.';
            } else {
              $scope.message = '';
              for(var i = 0; i < getUserGroups.length; i++){
                userGroups.push(getUserGroups[i]);
               /* if(getUserGroups[i].filename) {
                  var filename = getUserGroups[i].filename;
                  $scope.getGroupImages(filename);
                }*/
              }

            }
            $scope.groups = userGroups;
            $scope.members = 1;

          }, function(status){
            console.log(status);
          });
        }

        $scope.toggleDocumentOverlay = function() {
          $scope.documentOverlay = !$scope.documentOverlay;
        }
}]);