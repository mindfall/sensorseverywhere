angular.module('app').value('wFToastr', toastr);

angular.module('app').factory('wFNotifier', function(wFToastr){
	return {
		notify: function(msg){
			wFToastr.success(msg);
		}, 
		error: function(msg){
			wFToastr.error(msg);
		}
	}
})