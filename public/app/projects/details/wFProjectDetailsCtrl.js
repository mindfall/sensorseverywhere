angular.module('app')
	.controller('wFProjectDetailsCtrl', function($scope, $stateParams, wFProjectFactory) {

        $scope.project_id = $stateParams.id;

        var details = wFProjectFactory.viewProjectDetails($stateParams.id);

        details.then(function(details){

                $scope.project_name = details.project_name;
                $scope.start_date = details.project_start_date;
                $scope.contributions = details.total_contributions;
        }, function(status){
                console.log(status);
        });
});
