angular.module('app')
	.controller('wFProjectDetailsCtrl', ['$scope', '$location', '$stateParams', 'wFProjectFactory', 'wFMapFactory',
                function($scope, $location, $stateParams, wFProjectFactory, wFMapFactory) {

        $scope.projectName = $location.path().split('/')[3];
        $scope.monitors = [];

        var details = wFProjectFactory.viewProjectDetails($scope.projectName);
        details.then(function(details){

            var setCoords = details.project_location_data.project_coords.coordinates;
            var setMonitors = details.project_monitors;
            wFMapFactory.setEditMapData(setCoords);

            $scope.project = details;

            var result = details.project_monitors;
 
            for(var i = 0; i < result.length; i++) {

                var monitor = {
                        monitorActive: result[i].monitorActive,
                        monitorName: result[i].monitorName,
                        monitorType: result[i].monitorType,
                        monitorSpecificWildlife: result[i].monitorSpecificWildlife,
                }
                $scope.monitors.push(monitor);
                 var markerIcon = wFMapFactory.setEditMarker(result[i].monitorPosition, result[i].monitorWildlifeClass, result[i].monitorType);
            }

        }, function(status){
             console.log(status);
        });

}]);
