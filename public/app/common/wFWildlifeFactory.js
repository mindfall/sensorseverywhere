angular.module('app').factory('wFWildlifeFactory', function($rootScope, $http, $q){

	var selectedWildlife = [];

	return {

		getWildlifeFromDB : function(){
			var deferred = $q.defer();
			$http({method: 'GET', url: 'api/wildlife'}).
				success(function(data, status, headers, config){
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

	}
});

//helper function to determine object length
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};