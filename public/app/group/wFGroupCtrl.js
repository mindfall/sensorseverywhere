angular.module('app').controller('wFGroupCtrl', function($scope){
  $scope.tabs = [
    { title:"Dynamic Title 1", content:"<h1>Dynamic content 1</h1>" },
    { title:"Dynamic Title 2", content:"Dynamic content 2" }
  ];

  $scope.navType = 'pills';
});