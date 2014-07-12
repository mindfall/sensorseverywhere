angular.module('app')
	.controller('wFWildlifeSelectCtrl', function($scope, $rootScope, $http, $q, wFWildlifeFactory) {

		this.toggle = true;
		var wildlifePopup = false; //used for wildlife popup in selection list
		var commentPopup = false;
		var typeaheadArray = []; //Used to build list for animal search input
		$rootScope.selectedWildlife = [];
		$rootScope.dupeList = [];

	    $scope.wildlifeSelect = ''; //string sent by search form for selectionCtrl
	    $scope.wildlifeCounter = 1;
	   	$scope.selectedWildlife = wFWildlifeFactory.selectWildlife();
		/**
	    * Create a promise to return the wildlife list
	    * from the getWildlife function in the 
	    * WildlifeFactory service.
	    */
	   	var getWildlifeDBList = wFWildlifeFactory.getWildlifeFromDB();

	   	getWildlifeDBList.then(function(getWildlifeDBList) {

	   		for(var i = 0; i < getWildlifeDBList.length; i++) {
				typeaheadArray.push(getWildlifeDBList[i]);
			}
			wildlife = typeaheadArray.filter(function(elem, pos) {
				return typeaheadArray.indexOf(elem) == pos;
			});
			$scope.wildlife = wildlife;
	   	}, function(status) {
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
	    $scope.selectWildlife = function(wildlife) {

	      	if(this.wildlifeSelect) {
	      		//console.log(this.wildlifeSelect);
	      		$rootScope.dupeList.push(this.wildlifeSelect);
	      		var dupes = $rootScope.dupeList.length,
		        	found,
		        	x, y;
			    //loop through original array   
			    for ( x = 0; x < dupes; x++ ) {
			    	//set found to false
			        found = false;
			        //loop through the new array - initialised to empty
			        for ( y = 0; y < $rootScope.selectedWildlife.length; y++ ) {
			        	if ( $rootScope.dupeList[x] === $rootScope.selectedWildlife[y] ) { 
			              found = true;
			              break;
			            }
			        }
			        //first loop skips to this statement which adds the first element to the new array.
			        //in other words - this is where the unique elements are kept.
			        if ( !found) {
			        	$rootScope.selectedWildlife.push($rootScope.dupeList[x]);
			        	$scope.selectedWildlife.push(this.wildlifeSelect);
			        //	console.log($scope.selectedWildlife);
			         }    
			    }
	    	}
	 	}

	    $scope.removeSelectedWildlife = function() {
	    	$scope.selectedWildlife.splice(this.$index, 1);
	    	for(i = 0; i < $rootScope.dupeList.length; i += 1 ) {
	    		$rootScope.dupeList.splice(i, 1);
	    	}
	    	for(i = 0; i < $rootScope.selectedWildlife.length; i += 1 ) {
	    		$rootScope.selectedWildlife.splice(i, 1);
	    	}
	    }
	   	

	 	$scope.wildlifePopup = function(state, wildlife) {

	 		if(state === 'show') {
	 			wildlifePopup = true;
 				$scope.wildlifeDetails = wildlife;
	 		}
	 		if(state === 'hide') {
	 			wildlifePopup = false;
	 		}
	 		return wildlifePopup;
	 	}


	 	$scope.commentPopup = function(state) {
	 		if(state === 'show')	commentPopup = true;

	 		if(state === 'hide') commentPopup = false;

	 		return commentPopup;
	 	}

	 	$scope.saveWildlifeComments = function(comments) {
	 		$scope.wildlifeComments = comments;
	 		commentPopup = false;
	 		return $scope.saveWildlifeComments, commentPopup;
	 	}

	}).directive('wildlifePopup', function() {
		return {
			priority: 1000,
			restrict: 'EA',
			transclude: 'element',
			templateUrl: '/partials/main/wildlifePopup',
			replace: true,

		}
	}).directive('commentPopup', function() {
		return {
			restrict: 'E',
			transclude: true,
			templateUrl: '/partials/main/commentPopup',
			replace: true,

		};
	});