angular.module('app')
	.controller('wFWildlifeSelectCtrl', function($scope, $http, $q, wFWildlifeFactory){

		this.toggle = true;
		var wildlifePopup = false; //used for wildlife popup in selection list
		var wildlifeArray = []; //Used to build list for animal search input
		var selectedWildlife = []; //Used in submitAnimal to find if animal already exists in list
	    
	    $scope.hasMonitor = 0;
	    $scope.wildlifeSelect = ''; //string sent by search form for selectionCtrl
	    $scope.selectedWildlife = wFWildlifeFactory.getSelectedWildlife();

	    $scope.monitorTypes = [
					{name: 'video', value: 'video'},
					{name: 'audio', value: 'audio'}
				];
		$scope.monitors = {type: $scope.monitorTypes[0].value};

	    /**
	    * Create a promise to return the wildlife list
	    * from the getWildlife function in the 
	    * WildlifeFactory service.
	    */

	   	var getWildlifeDBList = wFWildlifeFactory.getWildlifeFromDB();

	   	getWildlifeDBList.then(function(getWildlifeDBList){

	   		for(var i = 0; i < getWildlifeDBList.length; i++){
				wildlifeArray.push(getWildlifeDBList[i]);
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
				wFWildlifeFactory.checkIfUniqueAndAddName(selectedWildlife);
	    	}
	 	}

	 	$scope.wildlifePopup = function(state, wildlife){
	 		if(state == 'show'){
	 			wildlifePopup = true;
 				$scope.wildlifeDetails = wildlife;
	 		}
	 		if(state == 'hide') wildlifePopup = false;

	 		return wildlifePopup;
	 	}

	}).directive('draggability', function($document){
		return function(scope, element, attr){
			var startX = 0, startY = 0, x = 0, y = 0;

			element.css({
				position: 'relative',
				cursor: 'pointer',
				zindex: '8888'
			});

			element.on('mousedown', function(event){
				console.log('mousedown');
				event.preventDefault();
				startX = event.pageX - x;
				startY = event.pageY - y;
				$document.on('mousemove', mousemove);
				$document.on('mouseup', mouseup);
			});

			function mousemove(event){
				y = event.pageY - startY;
				x = event.pageX - startX;
				element.css({
					top: y + 'px',
					left: x + 'px'
				});
			}

			function mouseup(){
				$document.unbind('mousemove', mousemove);
				$document.unbind('mouseup', mouseup);
			}
		};
	}).directive('popup', function(){
		return {
			restrict: 'E',
			transclude: true,
			templateUrl: '/partials/main/popup',
			replace: true,

		}
	});


		//- div.closePopUp(ng-click="wildlifePopup('hide')") X 
							//- div{{wildlifeDetails.name}}<br>
							//- div<img ng-src="{{wildlifeDetails.image_full}}">