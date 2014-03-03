angular.module('app')
	.controller('wFWildlifeSelectCtrl', function($scope, $http, $q, wFWildlifeFactory){

		this.toggle = true;
		var showWildlifePopup = false; //used for wildlife popup in selection list
		var getWildlifeList = []; //retrieving animal list from express via api
		var wildlifeArray = []; //Used to build list for animal search input
		var selectedWildlife = []; //Used in submitAnimal to find if animal already exists in list
	    
	    $scope.wildlifeSelect = ''; //string sent by search form for selectionCtrl
	    $scope.selectedWildlife = wFWildlifeFactory.wildlifeList();

	    /**
	    * Create a promise to return the wildlife list
	    * from the getWildlife function in the 
	    * WildlifeFactory service.
	    */

	   	getWildlifeList = wFWildlifeFactory.getWildlife();

	   	getWildlifeList.then(function(getWildlifeList){

	   		for(var i = 0; i < getWildlifeList.length; i++){
				wildlifeArray.push(getWildlifeList[i]);
			}
			wildlife = wildlifeArray.filter(function(elem, pos){
				return wildlifeArray.indexOf(elem) == pos;
			});
			$scope.wildlife = wildlife;
	   	}, function(status){
	   		console.log(status);
	   	});

	    
	    $scope.removeSelectedWildlife = function(){
	    	$scope.selectedWildlife.splice(this.$index, 1);
	    }
	   	

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

	 	$scope.getWildlifePopup = function(parseString, wildlife){
	 		if(parseString == 'show') {
	 			showWildlifePopup = true;
	 			$scope.wildlifeDetails = wildlife;
	 		}
	 		if(parseString == 'hide') showWildlifePopup = false;
	 		return showWildlifePopup;
	 	}

	});