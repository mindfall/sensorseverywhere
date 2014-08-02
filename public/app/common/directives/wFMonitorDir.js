angular.module('app')
	.directive('monitor', ['$rootScope', '$location', 'wFProjectFactory', 'wFWildlifeFactory', 'wFMapFactory', 'wFNotifier', 
		function($rootScope, $location, wFProjectFactory, wFWildlifeFactory, wFMapFactory, wFNotifier) {
			return {
			restrict: 'E',
			transclude: true,
			templateUrl: '/partials/monitor/monitor',
			replace: true,
			scope: {
				addMonitorData: '=',
				addMarker: '='
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
					{name: 'temperature', value: 'temperature'},
					{name: 'moisture', value: 'moisture'},
					{name: 'other', value: 'other'}
				];
				scope.setMonitor = {type: scope.monitors[0].value};

				scope.active = [
					{name: 'yes', value: 'yes'},
					{name: 'no', value: 'no'}
				];
				scope.setActive = {type: scope.active[0].value};

				scope.selectMonitor = function() {
				//	console.log(scope.setMonitor);
					if(scope.setMonitor.type === 'other') {
						scope.monitorTypeText = true;
					}
				}

				scope.$on('showMonitorPopup', function() {
					scope.monitorPopup = true;
					if(!$rootScope.$$phase) {
						scope.$apply();	
					}
					
				});
				scope.monitorNoThanks = function() {
					scope.monitorPopup = false;
				}
				scope.monitorContinue = function() {
					scope.monitorIntro = false;
					scope.monitorDetails = true;
				}
				scope.monitorSpecificWildlifeYes = function() {
					scope.wildlifeSelection = [];
					var selectedWildlife = wFWildlifeFactory.selectWildlife();

					if(selectedWildlife.length !== 0) {
						for(var i = 0; i < selectedWildlife.length; i++) {
							wildlife = {
								name: selectedWildlife[i].name,
								value: selectedWildlife[i].name
							}

							scope.wildlifeSelection.push(wildlife);
						}

						scope.setWildlife = {type: selectedWildlife[0].name};
						scope.monitorWildlife = true;
					} else {
						wFNotifier.error('You have not selected any wildlife.');
					}
						
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
				scope.saveMonitor = function(name, type, active, specificWildlife) {
					var monitorData = {
						name: name, 
						type: type,
						active: active,
						specificWildlife: specificWildlife
					}
					wFProjectFactory.setMonitorData(monitorData);
					scope.monitorPopup = false;
					if($location.path().split('/')[2]) {
						scope.$parent.addMonitorData();
					}
					scope.$parent.addMarker();

				}

				ele.on('click', function(e) {
					
					e.stopPropagation();
				});
				
			}

		};
}]);