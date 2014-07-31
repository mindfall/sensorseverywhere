angular.module('app')
	.controller('wFEditProjectCtrl', ['$scope', '$location', '$rootScope', '$http', '$q', 'wFWildlifeFactory', 'wFProjectFactory', 'wFMapFactory',
		function($scope, $location, $rootScope, $http, $q, wFWildlifeFactory, wFProjectFactory, wFMapFactory){

		var coords = [];
		var points = [];
		var wildlife = [];
		var projectWildlife = [];
		var monitors = [];
		$scope.wildlife = [];
		$scope.monitors = [];
		//var user = wFIdentity.currentUser;

		this.toggle = true;
		var typeaheadArray = []; //Used to build list for animal search input
		$rootScope.selectedWildlife = [];
		$rootScope.dupeList = [];

	    $scope.wildlifeSelect = ''; //string sent by search form for selectionCtrl
	    $scope.wildlifeCounter = 1;
	   	$scope.selectedWildlife = wFWildlifeFactory.selectWildlife();
	    var getWildlifeList = wFWildlifeFactory.getWildlife();

   		for(var i = 0; i < getWildlifeList.length; i++) {
			typeaheadArray.push(getWildlifeList[i]);
		}
		wildlife = typeaheadArray.filter(function(elem, pos) {
			return typeaheadArray.indexOf(elem) == pos;
		});
		$scope.wildlife = wildlife;
	    /**
	    * 	$scope.submitAnimal
	    * 	@params 
		*	add animal to array
		*	check to see if animal exists in array via addName() 
		*	increment step counter
		*   else 
		*   display it on selected list
	    */		
	    $scope.editSelectedWildlife = function(wildlife) {

	      	if(this.wildlifeSelect) {
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

	    $scope.removeSelectedMonitor = function() {
	    	$scope.monitors.splice(this.$index, 1);
  	    }


		$scope.getProjectById = function(id) {
			var i = 0;
	 		var project = wFProjectFactory.getProjectById(id);
	 		project.then(function(project) {
		 			$scope.project = project;

		 			//map points for layer

		 			project_coords = project.project_location_data.project_coords.coordinates;

		 			for(i; i < project_coords.length; i++) {
		 				coords.push(project_coords[i]);
		 			}
		 			wFMapFactory.setEditMapData(coords);
		 			
		 			if(project.project_monitors.length === 0 ) {
		 				$scope.monitorMessage = 'There are no monitors to display.';
		 			} else {
			 			for(i = 0; i < project.project_monitors.length; i++) {
			 				if(project.project_monitors[i].monitorSpecificWildlife === undefined) {
			 					project.project_monitors[i].monitorSpecificWildlife = "No wildlife selected."
			 				}

			 				monitors.push(project.project_monitors[i]);
		 				}
		 				$scope.monitors = monitors;

		 			}

		 			if(project.project_wildlife === 0) {
		 				$scope.wildlifeMessage = 'This project has no wildlife.';
		 			} else {
		 				for(i = 0; i < project.project_wildlife.length; i++ ) {
		 					projectWildlife.push(project.project_wildlife[i]);
		 					
		 				}
		 				$scope.projectWildlife = projectWildlife;
		 			}
	 	 		}, function(status) {
	 			console.log(status);
	 		})

	 	//	$location.url('/projects/edit/' + id);
			
	 	}


	 	$scope.findActiveMembers = function(project) {
				
			var selectOwner = [];
			var activeMembers = wFTaskFactory.findActiveGroupMembers(project);
			
			activeMembers.then(function(data) {

				for(var i = 0; i < data.length; i++) {

					for(var j = 0; j < data[i].groupMembers.length; j++) {
						var ownerAttrs = {
							name: data[i].groupMembers[j].username.toString(),
							value: data[i].groupMembers[j].username.toString()
						}
						selectOwner.push(ownerAttrs);
					}
					$scope.selectOwner = selectOwner;
					$scope.setOwner = {type: $scope.selectOwner[0].value};

					console.log($scope.selectOwner);
				}
			});
		}

		$scope.showMonitorPopup = function() {
			$rootScope.$broadcast('showMonitorPopup');
		}

	 	$scope.monitorTypes = [
			{name: 'audio', value: 'audio'},
			{name: 'video', value: 'video'},
			{name: 'temperature', value: 'temperature'},
			{name: 'moisture', value: 'moisture'},
			{name: 'other', value: 'other'}
		];
		$scope.setMonitor = {type: $scope.monitorTypes[0].value};


	 	var id = $location.path().split('/')[3] || "Unknown";
		$scope.getProjectById(id);	


	}]);

