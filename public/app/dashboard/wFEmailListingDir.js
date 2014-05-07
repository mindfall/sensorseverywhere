angular.module('app').directive('emailListing', function() {
	return {
		restrict: 'EA',
		replace: false,
		scope: {
			email: '=', //accept an object as parameter
			action: '&' //accept a function as a parameter
//			shouldUseGravatar: '@' //accept a string as a parameter
		},
		template: '<h1>Hello</h1>'
	}
});

/*ng-click="setSelectedMail(mail)"
.container(class="emailListing" ng-class="{selected: isSelected(mail)}")
    .col-sm-4 {{ mail.from }}
    .col-sm-8 {{ mail.body }}*/