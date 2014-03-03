/**
* app ModngResource, ngRouteule
*
* Description
*/

angular.module('app', [
	'ngResource',
	'ngRoute',
	'leaflet-directive',
	'ui.bootstrap'
	]);

angular.module('app').config(function($routeProvider, $locationProvider){
	$locationProvider.html5Mode(true);
	var routeRoleChecks = {
		admin: {	auth: function(wFAuth){
				return wFAuth.authorizeCurrentUserForRoute('admin')
			}
		}
	}

	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/', 
				{templateUrl: '/partials/main/main', 
				controller: 'wFWildlifeSelectCtrl'
		})
		.when('/fund/main', 
				{templateUrl: '/partials/fund/main', 
				controller: 'wFFundCtrl'
		})
		.when('/fund/contribute', 
				{templateUrl: '/partials/fund/contribute', 
				controller: 'wFFundCtrl'
		})
		.when('/fund/add_project', 
				{templateUrl: '/partials/fund/add_project', 
				controller: 'wFFundCtrl'
		})
		.when('/monitor/main', 
				{templateUrl: '/partials/monitor/main', 
				controller: 'wFMonitorCtrl'
		})
		.when('/admin/users', 
				{templateUrl: '/partials/admin/user-list', 
				controller: 'wFUserListCtrl',
				resolve: routeRoleChecks.admin
		})
		.when('/signup',
				{templateUrl: '/partials/account/signup',
				controller: 'wFSignupCtrl'
		});
});

angular.module('app').run(function($rootScope, $location){
	$rootScope.$on('$routeChangeError',function(evt, current, previous, rejection){
		if(rejection === 'not authorized') {
			$location.path('/');
		}
	})
})

