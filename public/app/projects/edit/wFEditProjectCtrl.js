angular.module('app')
	.controller('wFEditProjectCtrl', ['$scope', '$location', '$rootScope', '$http', '$q', 'wFWildlifeFactory', 'wFProjectFactory', 'wFMapFactory', 'wFTaskFactory',
		function($scope, $location, $rootScope, $http, $q, wFWildlifeFactory, wFProjectFactory, wFMapFactory, wFTaskFactory){

		var id = $location.path().split('/')[3] || "Unknown";
		var coords = [];
		var project_coords = [];
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

  	    /**
  	    * Reinflates the project from db for editing.
  	    **/
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
			 			//These are the monitors already in the project
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
				 				monitors.push(project.project_monitors[i]);
			 				}
			 				$scope.monitors = monitors;
			 					 				
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
	 	//	console.log($location.path().split('/')[3]);
	 		$scope.getProjectById(id);	
	 	}

	 	$scope.updateMonitors = function() {
	 		var result = wFProjectFactory.getEditMonitors();
	 		for(var i = 0; i < result.length; i++) {

	 			var monitor = {
	 				monitorActive: result[i].active,
	 				monitorName: result[i].name,
	 				monitorType: result[i].type,
	 				monitorSpecificWildlife: result[i].specificWildlife,
	 				monitorWildlifeClass: result[i].wildlifeClass,
	 				monitorPosition: result[i].position
	 			}
	 			$scope.monitors.push(monitor);
	 		}
	 		$scope.$apply();
	 	}
	 	



	 	/**
	 	* This function populates the project owner dropdown with active group members for the project, in case the owner is to be changed
	 	* @params project, owner
		*/
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

		$scope.showMonitorPopup = function() {
			$rootScope.$broadcast('showMonitorPopup');
		}

		/**
		* This function prepares wildlife selected on the edit project for the db, ensuring it has the same data structure 
		* @params id, name, number, classification, thumb
		**/
		var selectionStats = [];
		$scope.setSelectionNumber = function(id, name, number, classification, thumb) {
			var wildlifeStats = {
				wildlifeId: id,
				wildlifeNames: name,
				wildlifeNumbers: number, 
				wildlifeClassification: classification,
				wildlifeThumb: thumb
			}
			selectionStats.push(wildlifeStats);
			return selectionStats;
		}
		/**
		* Submit to database
		* @params name, desc, start_date, end_date, group, owner, type, wildlifeNameSelect, wildlifeNumbersSelect, wildlifeNameProject, monitorName, monitorType, monitorSpecificWildlife, monitorIsActive
		**/
		$scope.editProject = function() {

			var i, j;
			var selection = [];
			var wildlife = [];
			var coords = [];
			var	latlngs = [];
			//console.log(project_coords);
			mapData = wFMapFactory.getEditMapData();
			for(i = 0; i < mapData.length; i++) {
				if(mapData[i].lng !== undefined || mapData[i].lat !== undefined) {
					latlngs.push([mapData[i].lng, mapData[i].lat]);
				} else {
					continue;
				}
				
			}

			if(latlngs.length === 0) {
				console.log('coords = project_coords');
				coords = project_coords;
			} else {
				console.log('coords = latlngs');
				coords.push(latlngs);
			}

			//first push the scoped objects onto a new array so we can mutate it later
			for(i = 0; i < $scope.selectedWildlife.length; i++) {
				selection.push($scope.selectedWildlife[i]);
			}
			//second add the items already in the project to the submission array.
			//the number value may or may not have been updated.
			for(i = 0; i < $scope.projectWildlife.length; i++) {
				wildlife.push($scope.projectWildlife[i]);
			}
			//if selectionStats has an object in it we know that it is well formed
			if(selectionStats.length > 0) {
				//look for a match in the selection array
				for(i = 0; i < selection.length; i++) {
					for(j = 0; j < selectionStats.length; j++) {
						if(selection[i].name === selectionStats[j].name) {
							//and push it onto the submission array
							wildlife.push(selectionStats[j]);
							selection.splice(i, 1);
						} 
					}
				}
			}

			//finally, take what's remaining of the selection array and prepare it for
			//the db.
			for(i = 0; i < selection.length; i++) {
				var remainder = {
					wildlifeId: selection[i]._id,
					wildlifeNames: selection[i].name,
					wildlifeNumbers: 1,
					wildlifeClassification: selection[i].classification,
					wildlifeThumb: selection[i].image_thumb
				}
				wildlife.push(remainder);
			}


			console.log(wildlife);

			var monitors = $scope.monitors;
			var name = $scope.project.project_name;
			var description = $scope.project.project_description;
			var start_date = $scope.project.project_start_date;
			var end_date = $scope.project.project_end_date;
			var group = $scope.project.project_group;
			var owner = $scope.project.project_owner;
			var type = $scope.project.project_type;

			//build the selection object to match db entry


			var projectData = {
				project_name: name,
				project_description: description,
				project_start_date: start_date,
				project_end_date: end_date,
				project_group: group,
				project_owner: owner, 
				project_type: type, 
				project_wildlife: wildlife,
				project_monitors: monitors,
				project_coords: coords
			}

			projectEdit = wFProjectFactory.updateProject(id, projectData);
			$location.url('/dashboard');
		}

}]);
