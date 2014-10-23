angular.module('app')
	.factory('wFWildlifeFactory', ['$rootScope', '$http', '$q', 
		function($rootScope, $http, $q){

			var selectedWildlife = [];
			var editSelectionWildlife = [];
			var wildlife = [];

			return {

				getWildlifeFromDB : function(){
					var deferred = $q.defer();
					$http({method: 'GET', url: 'api/wildlife'}).
						success(function(data, status, headers, config){
							wildlife = data;
							deferred.resolve(data);
						}).
						error(function(data, status, headers, config){
							deferred.reject(status);
						});

					return deferred.promise;

				},

			    selectWildlife : function() {
			    	selectedWildlifeArray = selectedWildlife;
			   		return selectedWildlifeArray;
				},

				getWildlife : function() {
					return wildlife;
				}
			}
}]);

//helper function to determine object length
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};