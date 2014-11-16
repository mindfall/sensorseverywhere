angular.module('app').
  controller('wFDashboardCtrl', ['$scope', '$location', '$q', '$http', 'wFIdentity', 'wFProjectFactory', 'wFGroupFactory',
    function($scope, $location, $q, $http, wFIdentity, wFProjectFactory, wFGroupFactory) {

      var emailPopup = false;
      var chatPopup = false;
    	var getUserProjects = [];
    	var userProjects = [];
      var getUserGroups = [];
      var userGroups = [];
      var user = wFIdentity.currentUser;
      var counter = 0;
      $scope.identity = wFIdentity;
      $scope.users = [];
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
          if(counter % 2 == 0) {
            $scope.buttonLabel = 'Create Group';
          } else {
            $scope.buttonLabel = 'Show Groups';
          }
          $scope.groupForm = !$scope.groupForm;
          $scope.groupList = !$scope.groupList;

          counter++;

        }
        
        $scope.getFiles = function(name, type) {
          var dfd = $q.defer();
          $http({method: 'GET', url: '/api/'+type+'Files/' + name})
            .success(function(data, success, headers, config) {
              dfd.resolve(data);
              $scope.groupImage = data;

            }).
            error(function(data, status, headers, config) {
              dfd.reject(status);
              $scope.msg = 'There are no ' + type + 'files to display.';
          });
          return dfd.promise;
        } 

        $scope.toggleDocumentOverlay = function() {
          $scope.documentOverlay = !$scope.documentOverlay;
        }

        $scope.emailPopup = function(state) {
          if(state === 'show') {
            emailPopup = true;

          }
          if(state === 'hide') {
            emailPopup = false;
          }
          return emailPopup;
        }

        $scope.chatPopup = function(state) {
          if(state === 'show') {
            chatPopup = true;
          }
          if(state === 'hide') {
            chatPopup = false;
          }
          return chatPopup;
        }

        $scope.toggleGroupForm();

}]).directive('emailPopup', function() {

    return {
      priority: 1000,
      restrict: 'EA',
      transclude: 'element',
      templateUrl: '/partials/dashboard/email/emailPopup',
      replace: true,

    }
  }).directive('chatPopup', function() {

    return {
      priority: 1000,
      restrict: 'EA',
      transclude: 'element',
      templateUrl: '/partials/dashboard/chat/chatPopup',
      replace: true,

    }
  });