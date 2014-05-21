angular.module('app').controller('wFFileUploadCtrl', function($scope, $upload) {
 $scope.onFileSelect = function($files, model) {
  console.log(model);
    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      $scope.upload = $upload.upload({
        url: '/api/' + model + 'FileUploads', //upload.php script, node.js route, or servlet url
        method: 'POST',
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined},

      //  data: {fileUpload: $scope.fileUpload},
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
	
});