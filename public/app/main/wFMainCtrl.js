angular.module('app')
	.controller('wFMainCtrl', ['$scope', '$location', '$http', '$compile', '$element', 'wFIdentity', 'wFMapFactory', 'wFWildlifeFactory', 'wFProjectFactory', 
		function($scope, $location, $http, $compile, $element, wFIdentity, wFMapFactory, wFWildlifeFactory, wFProjectFactory){

	var userIsLoggedIn = wFIdentity.isAuthenticated();
	if(userIsLoggedIn == true){
    	$scope.isLoggedIn = userIsLoggedIn;
   	}else{
   		$location.url('/');
   	}

	var projectPopup = false;
	var corridorData = {};
	var wildlifeNumbers = [];
	var checkWildlife = [];
	$scope.monitorIntro = true;

	$scope.checked;
	$scope.identity = wFIdentity;
	$scope.project_name = '';
	$scope.project_description = '';
	$scope.start_date = new Date();
	$scope.end_date = new Date();
	$scope.selectOrg = [
		{name: 'public', value: 'public'},
		{name: 'private', value: 'private'},
		{name: 'ngo', value: 'ngo'},
		{name: 'government', value: 'government'}
	];
	$scope.orgs = {type: $scope.selectOrg[0].value};
	$scope.funding_target = 0;
	$scope.total_contributions = 0;
	$scope.project_image = "";

	//This is just to get the 
   	$scope.setWildlifeNumbers = function(id, creature, value) {

   		wildlife = {
   			id: id,
   			name: creature,
   			numbers: value
   		}
   		var found;
   		checkWildlife.push(wildlife);
   		for(var i = 0; i < checkWildlife.length; i++) {
   			found = false;
   			for(var j = 0; j < wildlifeNumbers.length; j++) {
   				if(checkWildlife[i].name === wildlifeNumbers[j].name) {
   					found = true;
   					break;
   				}
   			}
   			if(!found) {
   				wildlifeNumbers.push(wildlife);
 				return wildlifeNumbers;
   			}
   		}
   	}


    $scope.saveCorridor = function(user){

    	var totalSpecies = [];
    	var monitors = {};
    	var species = {};
    	var wildLifeData = [];
    	$scope.wildlifeData = [];
    	$scope.monitorData = [];
    	var found = [];

	 	mapData = wFMapFactory.getMapData();

	 	mapTDA = wFMapFactory.getTownAndDistance(mapData.geometry.coordinates);
	 	mapArea = wFMapFactory.getMapArea(mapData.geometry.coordinates);

	 	wildlifeData = wFWildlifeFactory.selectWildlife();

	 	//This loop is desig
	 	for(var i = 0; i < wildlifeData.length; i++) {
	 		if(wildlifeNumbers.length === 0) {
	 			species = {
					id: wildlifeData[i]._id,
					name: wildlifeData[i].name,
					numbers: 1
				}
				$scope.wildlifeData.push(species);
	 		} else {
		 		for(var j = 0; j < wildlifeNumbers.length; j++) {
		 			if(wildlifeData[i]._id === wildlifeNumbers[j].id) {
		 				species = {
							id: wildlifeData[i]._id,
							name: wildlifeData[i].name, 
							numbers: wildlifeNumbers[j].numbers
						}
						$scope.wildlifeData.push(species);
						found.push(wildlifeData[i]._id);
		 			} 
		 		}

		 		if(found[0] === wildlifeData[i]._id || found[i] === wildlifeData[i]._id) {
					//do nothing
		 		} else {
		 			species = {
						id: wildlifeData[i]._id,
						name: wildlifeData[i].name, 
						numbers: 1
					}
		 			$scope.wildlifeData.push(species);
		 		}

	 		}
	 	}

	 	totalSpecies = $scope.wildlifeData.length;
	 	monitorData = wFProjectFactory.getMonitorData();
	
	 	for(var i = 0; i < monitorData.length; i++) {

			monitors = {
	 			active: monitorData[i].active,
	 			name: monitorData[i].name,
	 			specificWildlife: monitorData[i].specificWildlife,
	 			type: monitorData[i].type
	 		}	
	 		$scope.monitorData.push(monitors);
	 	}
	 	mapTDA.then(function(mapTDA) {
	 		$scope.nearestTownName = JSON.stringify(mapTDA.geonames[0].name);
	 		var distance = mapTDA.geonames[0].distance;
	 		$scope.nearestTownDistance = Math.round(distance * 100) / 100;
	 	});

	 	$scope.area = +mapArea.toFixed(2);

/*	 	console.log($scope.wildlifeData);
	 	console.log(totalSpecies);
	 	console.log($scope.monitorData);
	 	console.log(mapData);
	 	console.log($scope.area);*/
	 	
	 	//hold the project data to date.
	 	corridorData = {
	 		user: user,
	 		wildlifeData: $scope.wildlifeData,
	 		totalSpecies: totalSpecies,
	 		monitors: $scope.monitorData,
	 		geopoints: mapData,
	 		area: $scope.area
	 	}
	 	return corridorData;

	}

	
	$scope.saveProject = function(name, description, start, end, type, total){
		//console.log('owner: ' + wFIdentity.currentUser.firstname);
		var project_name = name;
		var project_description = description;
		var project_start = start;
		var project_end = end;
		var project_type = type;
		var project_funding_required = total;

		var nearestTown = $scope.nearestTownName;
	 	var nearestTownDistance = $scope.nearestTownDistance;	

	 	/*
			Need to include wildlife and monitor info.
	 	*/

		var projectData = {
			project_owner: wFIdentity.currentUser._id,
			project_owner_firstname: wFIdentity.currentUser.firstname,
			project_name : project_name,
			project_description : project_description,
			project_start : project_start,
			project_end : project_end,
			project_type : type,
			project_funding_required : project_funding_required,
			project_wildlife : corridorData.wildlifeData,
			project_monitors : corridorData.monitors,
			project_total_species: corridorData.totalSpecies,
			project_location : corridorData.geopoints.geometry.coordinates,
			project_map_layer_type: corridorData.geopoints.geometry.type,
			project_area: corridorData.area,
			project_town: nearestTown,
			project_distance_to_town: nearestTownDistance

		//	project_monitors : corridorData.monitors
		}
	//	var inspectProjectData = JSON.stringify(projectData);
	//	console.log(inspectProjectData);
		projectAdd = wFProjectFactory.addProject(projectData);
		$location.url('/dashboard');
	}

	$scope.cancelProject = function(){

		var corridorData = {};
		$scope.project_name = '';
		$scope.project_description = '';
		$scope.start_date = new Date();
		$scope.end_date = new Date();
		$scope.selectOrg = [
			{name: 'public', value: 'public'},
			{name: 'private', value: 'private'},
			{name: 'ngo', value: 'ngo'},
			{name: 'government', value: 'government'}
		];
		$scope.orgs = '';
		$scope.funding_target = 0;
		$scope.total_contributions = 0;
		$scope.project_image = "";

		projectPopup = false;

		return projectPopup;
	}

 	$scope.projectPopup = function(state){
 		if(state === 'show') projectPopup = true;

 		if(state === 'hide') projectPopup = false;

 		return projectPopup;
 	}

 	$scope.closePopup = function(){
 		projectPopup = false;

 		return projectPopup;
 	}

}]).directive('projectPopup', function(){
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: '/partials/main/projectFormPopup',
		replace: true,

	};
});

