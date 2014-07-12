angular.module('app')
	.controller('wFMonitorCtrl', ['$scope',  
		function($scope, wFWildlifeFactory){

	
/*
	$scope.showMonitorPopup = function() {
		$scope.monitorPopup = true;
	}*/


}]).directive('markerPopup', ['wFWildlifeFactory', function(wFWildlifeFactory) {
		return {
		restrict: 'E',
		transclude: true,
		templateUrl: '/partials/main/map/markerPopupTemplate',
		replace: true,
		scope: {

		},
		link: function(scope, ele, attrs) {
			scope.monitorPopup = false;
			scope.monitorIntro = true;
			scope.monitorDetails = false;
			scope.monitorTypeText = false;
			scope.monitorWildlife = false;
			scope.monitorIPAddress = false;
			scope.monitorSetup = false;
			var topMargin = 100;

			ele.css({
				'position': 'absolute',
			});

			scope.monitors = [
				{name: 'audio', value: 'audio'},
				{name: 'video', value: 'video'},
				{name: 'other', value: 'other'}
			];
			scope.setMonitor = {type: scope.monitors[0].value};

			scope.selectMonitor = function() {
			//	console.log(scope.setMonitor);
				if(scope.setMonitor.type === 'other') {
					scope.monitorTypeText = true;
				}
			}

			scope.$on('showMonitorPopup', function() {
				scope.monitorPopup = true;
				scope.$apply();
			});
			scope.monitorNoThanks = function() {
				scope.monitorPopup = false;
			}
			scope.monitorContinue = function() {
				scope.monitorIntro = false;
				scope.monitorDetails = true;
			}
			scope.monitorSpecificYes = function() {
				var selectedWildlife = wFWildlifeFactory.selectWildlife();
				if(selectedWildlife) {
					scope.wildlifeSelection = [
					{name: selectedWildlife[0].name, value: selectedWildlife[0].name},
					];
					scope.setWildlife= {type: selectedWildlife[0].name};
				}
				scope.monitorWildlife = true;
			}
			scope.monitorSpecificNo = function() {
				scope.monitorWildlife = false;
			}
			scope.monitorActiveYes = function() {
				scope.monitorIPAddess = true;
			}
			scope.monitorActiveNo = function() {
				scope.monitorSetup = true;
			}
			scope.closeMonitorPanel = function() {
				scope.monitorPopup = false;
			}
			ele.on('click', function(e) {
				e.stopPropagation();
			});
			
		}

	};
}]);