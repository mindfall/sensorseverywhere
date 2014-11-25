angular.module('app')
  .factory('wFFileFactory', ['$rootScope', '$http', '$q', '$location', 'wFNotifier', 
    function($rootScope, $http, $q, $location, wFNotifier){


      return {

          getFiles: function(topLevel, secondaryLevel, filename) {
              var dfd = $q.defer();
              var fileObj = {
                topLevel: topLevel,
                secondaryLevel: secondaryLevel,
                filename: filename
              };
              $http({method: 'GET', url: '/api/getProjectFiles/' + fileObj.topLevel + '/' + fileObj.secondaryLevel + '/' + fileObj.filename })
                .success(function(data, success, headers, config) {
                  dfd.resolve(data);
                  var image = data;
                }).
                error(function(data, status, headers, config) {
                  dfd.reject(status);
                  var msg = 'There are no ' + secondaryLevel + 'files to display.';
              });
              return dfd.promise;
            }
      };



}]);