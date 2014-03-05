angular.module('app')
	.controller('wFMainCtrl', function($scope, wFIdentity, wFMapFactory, wFWildlifeFactory, wFProjectFactory){

	$scope.identity = wFIdentity;
	var userIsLoggedIn = wFIdentity.isAuthenticated();
	if(userIsLoggedIn == true){
    	$scope.isLoggedIn = userIsLoggedIn;
   	}


   $scope.saveProject = function(user){
	 //	mapData = wFMapFactory.getMapData();
	 //	wildlifeData = wFWildlifeFactory.getSelectedWildlife();
	 	console.log(user);
	 	//console.log('saving map data ' + mapData + ' wildlife ' + wildlifeData);
	 	var projectData = {
	 		//user: user,
	 		//wildlife: wildlifeData,
	 		//geopoints: mapData
	 		//monitors: $scope.monitors,
	 		//privacy: $scope.privacy
	 	}
	 	console.log(projectData);
	 }

});