angular.module('app').
	controller('wFFileCtrl', function($scope) {
		console.log('Everything ok here...');
		$scope.options = {
            maxFileSize: 5000000,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
        };

});

angular.module('app').directive("fileupload", function() {
	return {
		restrict: "A",
		scope: {
			done: "&amp;",
		    progress: "&amp;",
		    fail: "&amp;",
		    uploadurl: "="
		},
	    link: function(scope, elem, attrs) {
		    uploadOptions = {
			     url: scope.uploadurl,
			     dataType: "json"
			};

			if(scope.done) {
				uploadOptions.done = function(e, data) {
					scope.$apply(function() {
				        scope.done
				        e: e
				        data: data		        	
		        	});
				};
			}

	    //    if scope.fail
 
	    //    if scope.progress
			elem.fileupload = uploadOptions;
		}
	}
});


    