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


   	$scope.setWildlifeValue = function(creature, value) {

   		wildlife = {
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

   		
//   		return wildlifeNumbers;
   	}


    $scope.saveCorridor = function(user){

    	var totalSpecies = wildlifeNumbers.length;
    	var audioMonitors, videoMonitors, other = 0;
    	$scope.wildlifeData = [];
    	$scope.monitorData = [];

	 	mapData = wFMapFactory.getMapData();

	 	mapTDA = wFMapFactory.getTownAndDistance(mapData.geometry.coordinates);
	 	mapArea = wFMapFactory.getMapArea(mapData.geometry.coordinates);
	 	wildlifeData = wFWildlifeFactory.selectWildlife();

	 	for(var i = 0; i < wildlifeNumbers.length; i++) {
			species = {

				name: wildlifeNumbers[i].name, 
				numbers: wildlifeNumbers[i].numbers
			}
			$scope.wildlifeData.push(species);
	 	}

	 	var monitors = wFProjectFactory.getMonitorData();

	 	for(var i = 0; i < monitors.length; i++) {

	 		if(monitors.type === 'audio') {
	 			audioMonitors++;
	 		} else if (monitors.type === 'video') {
	 			videoMonitors++;
	 		} else {
	 			other++;
	 		}
	 		
			 var monitors = {
	 			active: monitors[i].active,
	 			name: monitors[i].name,
	 			specificWildlife: monitors[i].specificWildlife,
	 			type: monitors[i].type
/*	 			audio: audioMonitors, 
	 			video: videoMonitors,
	 			other: other*/
	 		}	

	 		$scope.monitorData.push(monitors);
	 	}

	 	mapTDA.then(function(mapTDA) {
	 		$scope.nearestTownName = JSON.stringify(mapTDA.geonames[0].name);
	 		var distance = mapTDA.geonames[0].distance;
	 		$scope.nearestTownDistance = Math.round(distance * 100) / 100;
	 	});

	 	$scope.area = +mapArea.toFixed(2);
	 	
	 	//hold the project data to date.
	 	corridorData = {
	 		user: user,
	 		wildlifeData: $scope.wildlifeData,
	 		totalSpecies: totalSpecies,
	 		geopoints: mapData,
	 		area: $scope.area
	 	}
	 	//console.log('geopoints: ' + JSON.stringify(corridorData.geopoints));
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
	 	console.log(corridorData.wildlifeData);

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