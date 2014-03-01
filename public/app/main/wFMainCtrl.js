angular.module('app')
	.controller('wFMainCtrl', function($scope, $http, $q, wFWildlifeFactory){

		this.toggle = true;
		var wildlifeList = []; //retrieving animal list from express via api
		var wildlifeArray = []; //Used to build list for animal search input
		var selectedWildlife = []; //Used in submitAnimal to find if animal already exists in list
	    
	    $scope.wildlifeSelect = ''; //string sent by search form for selectionCtrl

	    /**
	    * Create a promise to return the wildlife list
	    * from the getWildlife function in the 
	    * WildlifeFactory service.
	    */

	   	wildlifeList = wFWildlifeFactory.getWildlife();

	   	wildlifeList.then(function(wildlifeList){

	   		for(var i = 0; i < wildlifeList.length; i++){
				wildlifeArray.push(wildlifeList[i]);
			}
			wildlife = wildlifeArray.filter(function(elem, pos){
				return wildlifeArray.indexOf(elem) == pos;
			});
			$scope.wildlife = wildlife;
	   	}, function(status){
	   		console.log(status);
	   	});
	   	

	    /**
	    * 	$scope.submitAnimal
	    * 	@params 
		*	add animal to array
		*	check to see if animal exists in array via addName() 
		*	increment step counter
		*   else 
		*   display it on selected list
	    */
		
	    $scope.submitWildlife = function(){

	    	if(this.wildlifeSelect){
	    		//create an array of selected animals
				selectedWildlife.push(this.wildlifeSelect);
				selectedName = this.wildlifeSelect;
				wFWildlifeFactory.addName(selectedWildlife);
	    	}
	 	}

	}).controller('wFSelectionCtrl', function($scope, wFWildlifeFactory){
		$scope.wildlife = wFWildlifeFactory.wildlifeList();
		//console.log($scope.animals);
	    
	    $scope.removeSelectedWildlife = function(){
	    	$scope.wildlife.splice(this.$index, 1);
	    }

	});