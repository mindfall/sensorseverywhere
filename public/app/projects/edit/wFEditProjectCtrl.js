angular.module('app')
	.controller('wFEditProjectCtrl', ['$scope', '$location', '$rootScope', '$http', '$q', 'wFWildlifeFactory', 'wFProjectFactory', 'wFMapFactory', 'wFTaskFactory',
		function($scope, $location, $rootScope, $http, $q, wFWildlifeFactory, wFProjectFactory, wFMapFactory, wFTaskFactory){

		var id = $location.path().split('/')[3] || "Unknown";
		var coords = [];
		var points = [];
		var wildlife = [];
		var projectWildlife = [];
		var monitorWildlife = [];
		$scope.monitoringWildlife = [];
		var monitors = [];
		$scope.wildlife = [];
		$scope.monitors = [];
		//var user = wFIdentity.currentUser;

		this.toggle = true;
		var typeaheadArray = []; //Used to build list for animal search input
		$rootScope.selectedWildlife = [];
		$rootScope.dupeList = [];

	//    $scope.wildlifeSelect = ''; //string sent by search form for selectionCtrl
	    $scope.wildlifeCounter = 1;
	    $scope.selectedWildlife = [];

	    var getWildlifeList = wFWildlifeFactory.getWildlife();
   		for(var i = 0; i < getWildlifeList.length; i++) {
			typeaheadArray.push(getWildlifeList[i]);
		}
		wildlife = typeaheadArray.filter(function(elem, pos) {
			return typeaheadArray.indexOf(elem) == pos;
		});
		$scope.wildlife = wildlife;


	 	$scope.monitorTypes = [
			{name: 'audio', value: 'audio'},
			{name: 'video', value: 'video'},
			{name: 'temperature', value: 'temperature'},
			{name: 'moisture', value: 'moisture'},
			{name: 'other', value: 'other'}
		];
		$scope.selectOrg = [
			{name: 'public', value: 'public'},
			{name: 'private', value: 'private'},
			{name: 'ngo', value: 'ngo'},
			{name: 'government', value: 'government'}
		];
		$scope.activeStates = [
			{name: 'yes', value: 'yes'},
			{name: 'no', value: 'no'},
			{name: 'not set', value: 'not set'}
		];
	

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
			        	if ( $rootScope.dupeList[x] === $rootScope.selectedWildlife[y]) { 
			              found = true;
			              break;
			            }
			        }
			        for ( y = 0; y < $scope.projectWildlife.length; y++ ) {
/*			        	console.log($scope.projectWildlife[y].wildlifeNames);
			        	console.log($rootScope.dupeList[x].name);*/
			        	if ( $rootScope.dupeList[x].name === $scope.projectWildlife[y].wildlifeNames) { 
			              found = true;
			              break;
			            }
			        }
   			        //first loop skips to this statement which adds the first element to the new array.
			        //in other words - this is where the unique elements are kept.
			        if ( !found) {
		        	   	$rootScope.selectedWildlife.push($rootScope.dupeList[x]);
			        	$scope.selectedWildlife.push(this.wildlifeSelect);
			        //	wFWildlifeFactory.setEditSelectionWildlife(this.wildlifeSelect);
			         }    
			    }
	    	}
	 	}


	    $scope.removeSelectedWildlife = function(type) {

	    	if(type === "selection") {
	    		$scope.selectedWildlife.splice(this.$index, 1);
		    	for(i = 0; i < $rootScope.dupeList.length; i += 1 ) {
		    		$rootScope.dupeList.splice(i, 1);
		    	}
		    	for(i = 0; i < $rootScope.selectedWildlife.length; i += 1 ) {
		    		$rootScope.selectedWildlife.splice(i, 1);
		    	}
		    } else {
		    	$scope.projectWildlife.splice(this.$index, 1);
		    }
	    }

	    $scope.removeSelectedMonitor = function() {
	    	$scope.monitors.splice(this.$index, 1);
  	    }


		$scope.getProjectById = function() {
				var i, j;
				var wildlifeClass = '';
		 		var project = wFProjectFactory.getProjectById(id);
		 		project.then(function(project) {
			 			$scope.project = project;
			 			//map points for layer
			 			project_coords = project.project_location_data.project_coords.coordinates;

			 			for(i = 0; i < project_coords.length; i++) {
			 				coords.push(project_coords[i]);
			 			}
			 			wFMapFactory.setEditMapData(coords);
			 			
			 			if(project.project_monitors.length === 0 ) {
			 				$scope.monitorMessage = 'There are no monitors to display.';
			 			} else {
				 			for(i = 0; i < project.project_monitors.length; i++) {
				 				if(project.project_monitors[i] === null) {
				 					continue;
				 				}
				 				if(project.project_monitors[i].monitorSpecificWildlife === null || project.project_monitors[i].monitorSpecificWildlife === undefined) {
				 					project.project_monitors[i].monitorSpecificWildlife = "No wildlife selected."
				 				}
				 				wFProjectFactory.setProjectMonitors(project.project_monitors[i]);
				 				monitors.push(project.project_monitors[i]);
			 				}
			 				$scope.monitors = monitors;
			 				//we need to push these monitors to a shared service to be able to play with them later
			 				
			 			}

			 			if(project.project_wildlife === 0) {
			 				$scope.wildlifeMessage = 'This project has no wildlife.';
			 			} else {
			 				for(i = 0; i < project.project_wildlife.length; i++ ) {
			 					projectWildlife.push(project.project_wildlife[i]);
			 					monitorWildlife.push(project.project_wildlife[i].wildlifeNames);

			 				}
			 			    for(i = 0; i < monitorWildlife.length; i++) {
								var wildlife = {
									name: monitorWildlife[i],
									value: monitorWildlife[i]
								}
								$scope.monitoringWildlife.push(wildlife);
							}
							wFProjectFactory.setWildlifeForEdit(monitorWildlife);
							$scope.setMonitoredWildlife = {type: monitorWildlife[0]};
			 				$scope.projectWildlife = projectWildlife;

			 				//find members for this project
			 				$scope.findActiveMembers(project.project_name, project.project_owner.owner_name);
			 			}


		 				for(i = 0; i < monitors.length; i++) {
		 					for(j = 0; j < projectWildlife.length; j++) {
		 						if(monitors[i].monitorSpecificWildlife === projectWildlife[j].wildlifeNames) {
		 							
		 							wildlifeClass = projectWildlife[j].wildlifeClassification;
		 						}
		 					}

		 					var markerIcon = wFMapFactory.setEditMarker(monitors[i].monitorPosition, wildlifeClass, monitors[i].monitorType);
		 				}
		 	 		}, function(status) {
		 			console.log(status);
		 		})
			
	 	}

	 	if($location.path().split('/')[3] === id){
	 		$scope.getProjectById(id);	
	 	}
	 	


	 	$scope.findActiveMembers = function(project, owner) {
			var owner = {
				name: owner,
				value: owner
			}
			var selectOwner = [];
			selectOwner.push(owner);

			var activeMembers = wFTaskFactory.findActiveGroupMembers(project);
			activeMembers.then(function(data) {
				if(data.length > 0) {
					for(var i = 0; i < data.length; i++) {
						for(var j = 0; j < data[i].groupMembers.length; j++) {
							var ownerAttrs = {
								name: data[i].groupMembers[j].username.toString(),
								value: data[i].groupMembers[j].username.toString()
							}
							selectOwner.push(ownerAttrs);
						}
					}
				}
				$scope.selectOwner = selectOwner;
			});
		}
		var selectionStats = [];
		$scope.showMonitorPopup = function() {
			$rootScope.$broadcast('showMonitorPopup');
		}

		$scope.setSelectionNumber = function(id, name, number, classification, thumb) {
			var wildlifeStats = {
				id: id,
				name: name,
				number: number, 
				classification: classification,
				thumb: thumb
			}
			selectionStats.push(wildlifeStats);
			return selectionStats;
		}

		$scope.selectedNotUpdated = function() {

		}
	
		$scope.editProject = function(name, desc, start_date, end_date, group, owner, type, wildlifeNameSelect, wildlifeNumbersSelect, wildlifeNameProject, monitorName, monitorType, monitorSpecificWildlife, monitorIsActive) {

			var i, j;
			var selection = [];
			var wildlifeEditSubmit = [];

			//first push the scoped objects onto a new array so we can mutate it later
			for(i = 0; i < $scope.selectedWildlife.length; i++) {
				selection.push($scope.selectedWildlife[i]);
			}
			//second add the items already in the project to the submission array.
			//the number value may or may not have been updated.
			for(i = 0; i < $scope.projectWildlife.length; i++) {
				wildlifeEditSubmit.push($scope.projectWildlife[i]);
			}
			
			//if selectionStats has an object in it we know that it is well formed
			if(selectionStats.length > 0) {
				//look for a match in the selection array
				for(i = 0; i < selection.length; i++) {
					for(j = 0; j < selectionStats.length; j++) {
						if(selection[i].name === selectionStats[j].name) {
							//and push it onto the submission array
							wildlifeEditSubmit.push(selectionStats[j]);
							selection.splice(i, 1);
						} 
					}
				}
			}

			//finally, take what's remaining of the selection array and prepare it for
			//the db.
			for(i = 0; i < selection.length; i++) {
				var remainder = {
					id: selection[i]._id,
					name: selection[i].name,
					number: 1,
					classification: selection[i].classification,
					thumb: selection[i].image_thumb
				}
				wildlifeEditSubmit.push(remainder);
			}

			console.log(wildlifeEditSubmit);

			monitorData = wFProjectFactory.getMonitorData();
/*
			for(var i = 0; i < selection.length; i++ ) {

			}*/


			//build the selection object to match db entry
/*			var selectionObject = {
				wildlifeId: selection._id,
				wildlifeNames: selection.name,
				wildlifeNumbers: selection.number
			}*/

	/*		//get wildlife info for wildlifeNameSelect and wildlifeNameProject
			var allWildlife = []; 
			var newWildlife = wildlifeNameSelect;
			var newWildlifeNumbers = 1;

			var existingWildlife = wildlifeNameProject;

			if(newWildlifeNumbersSelect !== 1) {
				newWildlifeNumbers = wildlifeNumbersSelect;
			}

			allWildlife.push(newWildlife);
			allWildlife.push(existingWildlife);

			var editProject = {
				name: name,
				description: desc,
				start: start_date,
				end: end_date,
				group: group,
				owner: owner, 
				type: type, 
				wildlife: wildlifeData,
				monitors: monitorData
			}*/
		}

}]);
