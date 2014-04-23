angular.module('app').controller('wFDashboardCtrl', function($scope) {

	$scope.selectedMail;
	$scope.setSelectedMail = function(mail) {
		$scope.selectedMail = mail;
	}

	$scope.isSelected = function(mail) {
		if($scope.selectedMail) {
			return $scope.selectedMail === mail;
		}
	}

});