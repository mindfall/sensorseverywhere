angular.module('app', [
	'ngResource',
	'ngRoute',
	'leaflet-directive',
	'ui.bootstrap',
	'ui.router',
	'bgDirectives',
	'xeditable',
	'angularFileUpload'	
]);

angular.module('app').config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){

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
		.state('dashboard', {
				url: '/dashboard',
				templateUrl: '/partials/dashboard/dashboard', 
				controller: 'wFDashboardCtrl'
		})
		.state('create-project', {
				url: '/create-project',
				templateUrl: '/partials/projects/create-project', 
				controller: 'wFWildlifeSelectCtrl'
		})
		.state('projects', {
				url: '/projects',
				templateUrl: '/partials/projects/projects', 
				controller: 'wFProjectCtrl'
		})
		.state('projects/contribute/:id', {
				url: '/projects/contribute/:id',
				templateUrl: '/partials/projects/contribute', 
				controller: 'wFContributionCtrl'
		})
		.state('projects/create-project', {
				url: '/projects/create-project',
				templateUrl: '/partials/projects/create-project',
				controller: 'wFProjectCtrl'
		})
		.state('projects/edit/:id', {
			url: '/projects/edit/:id',
			templateUrl: '/partials/projects/edit',
			controller: 'wFProjectCtrl'
		})
		.state('projects/project-details/:id', {
				url: '/projects/project-details/:id',
				templateUrl: '/partials/projects/project-details', 
				controller: 'wFProjectDetailsCtrl'
		})
		.state('monitor/main', {
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
		.state('groupSignup/:gid', {
				url: '/groupSignup/:gid',
				templateUrl: '/partials/account/groupSignup',
				controller: 'wFSignupCtrl'
		})
		.state('profile', {
				url: '/profile',
				templateUrl: '/partials/account/profile',
				controller: 'wFProfileCtrl',
				resolve: routeRoleChecks.user
		})
		.state('dashboard.files', {
				url: '/files',
				views: {
					'project-pane@dashboard': {templateUrl: '/partials/dashboard/dashboard-file-upload'},
				}
		});

});

angular.module('app').run(function($rootScope, $location){
	$rootScope.$on('$routeChangeError',function(evt, current, previous, rejection){
		if(rejection === 'not authorized') {
			$location.path('/');
		}
	})
})