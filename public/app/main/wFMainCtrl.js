angular.module('app')
	.controller('wFMainCtrl', function($scope, $location, wFIdentity, wFMapFactory, wFWildlifeFactory, wFProjectFactory){

	var projectPopup = false;
	var corridorData = {};

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


	var userIsLoggedIn = wFIdentity.isAuthenticated();
	if(userIsLoggedIn == true){
    	$scope.isLoggedIn = userIsLoggedIn;
   	}else{
   		$location.url('/');
   	}


    $scope.saveCorridor = function(user, monitorCount){
	 	mapData = wFMapFactory.getMapData();
	 	wildlifeData = wFWildlifeFactory.getSelectedWildlife();

	 	$scope.mapPoints = mapData;
	 	$scope.wildlife = wildlifeData;
	 	$scope.monitors = monitorCount;

	 	
	 	//hold the project data to date.
	 	corridorData = {
	 		user: user,
	 		wildlife: wildlifeData,
	 		geopoints: mapData,
	 		monitors: monitorCount
	 	}
		
		//Display current data 
		//Show form to collect additional project data.		
		//projectAdd = wFProjectFactory.addProject(corridorData);
		//console.log(projectAdd);
	}
	
	$scope.saveProject = function(name, description, start, end, type, total){

		var project_name = name;
		var project_description = description;
		var project_start = start;
		var project_end = end;
		var project_type = type;
		var project_funding_required = total;

		var projectData = {
			project_name : project_name,
			project_description : project_description,
			project_start : project_start,
			project_end : project_end,
			project_type : type,
			project_funding_required : project_funding_required,
			project_owner : corridorData.user,
			project_wildlife : corridorData.wildlife,
			project_location : corridorData.geopoints,
			project_monitors : corridorData.monitors
		}

		//console.log(projectData.project_owner);
		projectAdd = wFProjectFactory.addProject(projectData);

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
 		if(state === 'show')	projectPopup = true;

 		if(state === 'hide') projectPopup = false;

 		return projectPopup;
 	}

 	$scope.closePopup = function(){
 		projectPopup = false;

 		return projectPopup;
 	}


}).directive('projectPopup', function(){
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: '/partials/main/projectFormPopup',
		replace: true,

	};
});