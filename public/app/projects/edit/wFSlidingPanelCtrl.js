angular.module('app').controller('wMSlidingPanelCtrl', ['$scope', function($scope) {



	$scope.sliderControl = function() {
		var ele = angular.element('#slide-panel');
	}

}]).directive('slidePanel', function($interval) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: '/partials/projects/edit/sliding-panel-template',
		scope: {
			
		},
		link: function(scope, ele, attrs) {
			var counter = 0;
			var easing = 0.05;
			var arrow = ele[0].lastChild.lastElementChild.lastChild.lastChild;
			ele.bind('click', function(e) {
				
				e.stopPropagation();
				counter += 1;
				if(counter % 2 == 0) {
					var panelWidth = ele[0].offsetWidth;
					var panelEnd = 0 - 15;
					var panelStart = 0 - (panelWidth);
					var dx = panelEnd - panelStart;
					arrow.className = 'sliding-panel-border-arrow';

					setInterval(function() {
						if(panelStart < panelEnd) {
							var vx = dx * easing;
							panelStart += vx;
							panelStart = Math.ceil(panelStart);
							ele.css('margin-left', panelStart + 'px');
						}
					}, 10);
				} else {
					var panelWidth = ele[0].offsetWidth;
					var panelEnd = 0 - (panelWidth - 15);
					var panelStart = 0;
					var dx = panelStart - panelEnd;
					arrow.className = arrow.className + ' flip';
					setInterval(function() {
						if(panelStart > panelEnd) {
							var vx = dx * easing;
							panelStart -= vx;
							panelStart = Math.floor(panelStart);
							ele.css('margin-left', panelStart + 'px');
						}
					}, 10);
				}
				scope.$apply(function() {
				});
			});
		}
	}
});

