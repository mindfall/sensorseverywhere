angular.module('app', [
	'ngResource',
	'ngRoute',
	'leaflet-directive',
	'ui.bootstrap',
	'ui.router',
	'bgDirectives',
	'xeditable'
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
		.state('projects/:id', {
				url: '/projects/:id',
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
		.state('sign-to-group', {
				url: '/signup-to-group',
				templateUrl: '/partials/account/signup-to-group',
				controller: 'wFSignupCtrl'
		})
		.state('profile', {
				url: '/profile',
				templateUrl: '/partials/account/profile',
				controller: 'wFProfileCtrl',
				resolve: routeRoleChecks.user
		})
		.state('dashboard.groups', {
				url: '/groups',
				views: {
					'group-pane@dashboard': {templateUrl: '/partials/groups/groups',
											controller: 'wFGroupCtrl'
										},
				}
		})
		.state('dashboard.groups.email', {
				url: '/email',
				views: {
					'group-pane@dashboard': {templateUrl: '/partials/dashboard/email/dashboard-email',
										controller: 'wFEmailCtrl'
									},
				}
		})
		.state('dashboard.chat', {
				url: '/chat',
				views: {
					'group-pane@dashboard': {templateUrl: '/partials/dashboard/dashboard-chat',
										controller: 'wFChatCtrl'
									},
				}
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