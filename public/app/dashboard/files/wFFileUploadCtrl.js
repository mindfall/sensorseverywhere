angular.module('app')
  .controller('wFFileUploadCtrl', ['$scope', '$upload',
    function($scope, $upload) {
     $scope.onFileSelect = function($files, model) {
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
          var folderName = '';
          var file = $files[i];
          if($scope.projectName !== '') {
            folderName = $scope.projectName;
          }
          $scope.project_image = file.name;
          $scope.upload = $upload.upload({
            url: '/api/' + model + 'FileUploads/' + folderName, 
            method: 'POST',
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},
            data: {fileUpload: $scope.fileUpload},
            file: file, // or list of files: $files for html5 only
          }).progress(function(evt) {
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
          }).success(function(data, status, headers, config) {
             	console.log('file is uploaded successfully');
          })
          .error(function(data, status, headers, config){
            console.log('Error: ' + status);
          })

      }

  };
	
}]);