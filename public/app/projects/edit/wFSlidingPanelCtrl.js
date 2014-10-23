angular.module('app').controller('wMSlidingPanelCtrl', ['$scope', function($scope) {

	$scope.sliderControl = function() {
		var ele = angular.element('.monitor-panel');
	}

}]).directive('slidePanel', ['$interval', function($interval) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: '/partials/projects/edit/sliding-panel-template',
		scope: false,
		link: function(scope, ele, attrs) {
			var counter = 1;
			var easing = 0.05;
			ele.bind('click', function(e) {
				e.stopPropagation();
				counter += 1;
				if(counter % 2 == 0) {
					
					var panelHeight = ele[0].offsetHeight;
					var panelEnd = -20;
					var panelStart = 0 - (panelHeight);
					var dx = panelEnd - panelStart;

					setInterval(function() {
						if(panelStart < panelEnd) {
							var vx = dx * easing;
							panelStart += vx;
							panelStart = Math.ceil(panelStart);
							ele.css('margin-top', panelStart + 'px');
						}
					}, 10);
				} else {
					var panelHeight = ele[0].offsetHeight;
					console.log(panelHeight);
					var panelEnd = 0 - (panelHeight - 40);
					var panelStart = 0;
					var dx = panelStart - panelEnd;

					setInterval(function() {
						if(panelStart > panelEnd) {
							var vx = dx * easing;
							panelStart -= vx;
							panelStart = Math.floor(panelStart);
							ele.css('margin-top', panelStart + 'px');
						}
					}, 10);
				}
				scope.$apply(function() {
				});
			});
		}
	}
}]);

