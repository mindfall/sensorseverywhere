angular.module('app', [
	'ngResource',
	'ngRoute',
	'leaflet-directive',
	'ui.bootstrap',
	'ui.router'
]);

angular.module('app').config(function($locationProvider, $stateProvider, $urlRouterProvider){

	$locationProvider.html5Mode(true);
	var routeRoleChecks = {
		admin: {	auth: function(wFAuth){
				return wFAuth.authorizeCurrentUserForRoute('admin')
		}},
		user: {	auth: function(wFAuth){
				return wFAuth.authorizeAuthenticatedUserForRoute()
		}},
	}


	$stateProvider
		.state('/', {
				url: '/',
				templateUrl: '/partials/main/home', 
				controller: 'wFWildlifeSelectCtrl'
		})
		.state('main', {
				url: '/main',
				templateUrl: '/partials/main/main', 
				controller: 'wFWildlifeSelectCtrl'
		})
		.state('fund', {
				url: '/fund',
				templateUrl: '/partials/fund/main', 
				controller: 'wFFundCtrl'
		})
		.state('/fund/contribute/:id', {
				url: '/contribute/:id',
				templateUrl: '/partials/fund/contribute', 
				controller: 'wFFundContributeCtrl'
		})
		.state('/fund/:id', {
				url: '/fund/:id',
				templateUrl: '/partials/fund/fund-details', 
				controller: 'wFFundCtrl'
		})
		.state('/monitor/main', {
				url: '/monitor/main', 
				templateUrl: '/partials/monitor/main', 
				controller: 'wFMonitorCtrl'
		})
		.state('admin/users', {
				url: '/admin/users',
				templateUrl: '/partials/admin/user-list', 
				controller: 'wFUserListCtrl',
				resolve: routeRoleChecks.admin
		})
		.state('signup', {
				url: '/signup',
				templateUrl: '/partials/account/signup',
				controller: 'wFSignupCtrl', 
		})
		.state('profile', {
				url: '/profile',
				templateUrl: '/partials/account/profile',
				controller: 'wFProfileCtrl',
				resolve: routeRoleChecks.user
		})
		.state('.members', {
				url: '/members',
				templateUrl: '/partials/group/group-members',
		})
		.state('main.timeline', {
				url: '/timeline',
				templateUrl: '/partials/group/group-timeline',
		})
		.state('main.invite', {
				url: '/invite',
				templateUrl: '/partials/group/group-invite',
		});

});

angular.module('app').run(function($rootScope, $location){
	$rootScope.$on('$routeChangeError',function(evt, current, previous, rejection){
		if(rejection === 'not authorized') {
			$location.path('/');
		}
	})
})