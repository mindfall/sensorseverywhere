angular.module('app')
	.controller('wFWildlifeSelectCtrl', function($scope, $http, $q, wFWildlifeFactory){

		this.toggle = true;
		var wildlifePopup = false; //used for wildlife popup in selection list
		var commentPopup = false;
		var wildlifeArray = []; //Used to build list for animal search input
		var submittedWildlife = []; //Used in submitAnimal to find if animal already exists in list

	    $scope.wildlifeSelect = ''; //string sent by search form for selectionCtrl
	    $scope.wildlifeCounter = 1;
	    $scope.audioMonitors = 1;
	    $scope.videoMonitors = 1;
	    $scope.monitorCount = $scope.audioMonitors + $scope.videoMonitors;
	    $scope.selectedWildlife = wFWildlifeFactory.getSelectedWildlife();

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
		
	    $scope.submitWildlife = function(wildlife){
	    	if(this.wildlifeSelect){
	    		//create an array of selected animals
				submittedWildlife.push(this.wildlifeSelect);
				selectedName = this.wildlifeSelect;
				wFWildlifeFactory.checkIfUniqueAndAddName(submittedWildlife);
	    	}
	 	}

	 	$scope.wildlifePopup = function(state, wildlife){

	 		if(state === 'show'){
	 			$scope.wildlifeDetails = wildlife;
	 			wildlifePopup = true;
	 		}
	 		if(state === 'hide') wildlifePopup = false;

	 		return wildlifePopup;
	 	}

	 	$scope.commentPopup = function(state){
	 		if(state === 'show')	commentPopup = true;

	 		if(state === 'hide') commentPopup = false;

	 		return commentPopup;
	 	}

	 	$scope.saveWildlifeComments = function(comments){
	 		$scope.wildlifeComments = comments;
	 		commentPopup = false;
	 		return $scope.saveWildlifeComments, commentPopup;
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
				//console.log('mousedown');
				//event.preventDefault();
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
	}).directive('wildlifePopup', function(){
		//$scope.wildlifeDetails = wildlife;
		return {
			priority: 1000,
			scope: true,
			restrict: 'E',
			transclude: 'element',
			templateUrl: '/partials/main/wildlifePopup',
			link: function(scope, element, attr){
				//put in a $watch expression here
				var audio = scope.audioMonitors;
				var video = scope.videoMonitors;
			//	var monitorCount = audio + video;

			},
			replace: true,

		}
	}).directive('commentPopup', function(){
		return {
			restrict: 'E',
			transclude: true,
			templateUrl: '/partials/main/commentPopup',
			replace: true,

		};
	});
