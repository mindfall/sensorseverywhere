angular.module('app').value('wFToastr', toastr);

angular.module('app').factory('wFNotifier', function(wFToastr){
	return {
		notify: function(msg){
			wFToastr.success(msg);
			console.log(msg);
		}, 
		error: function(msg){
			wFToastr.error(msg);
			console.log(msg);
		}
	}
})