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

	    getSelectedWildlife : function() {
	    	selectedWildlifeArray = selectedWildlife;
			return selectedWildlifeArray;
		},
		/**
			Test to see if the animal already exists in the array.
			If it does, don't include in the list again.
		*/
		checkIfUniqueAndAddName : function(nameToAdd){
			
			//declare a new array for comparisons, get the original arrays length, boolean found and 2 loop integers
		    var nameLength = nameToAdd.length,
		        found,
		        x, y;
		    //loop through original array     
		    for ( x = 0; x < nameLength; x++ ) {
		    	//set found to false
		        found = undefined;
		        //loop through the new array - initialised to empty
		        for ( y = 0; y < selectedWildlife.length; y++ ) {
		            if ( nameToAdd[x] === selectedWildlife[y] ) { 
		              found = true;
		              break;
		            }
		        }
		        //first loop skips to this statement which adds the first element to the new array.
		        //in other words - this is where the unique elements are kept.
		        if ( !found) {
		        	selectedWildlife.push(nameToAdd[x]);
		         }    
		    }
		}
	}
});