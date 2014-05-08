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
		.state('create', {
				url: '/create',
				templateUrl: '/partials/projects/create-project', 
				controller: 'wFWildlifeSelectCtrl'
		})
		.state('projects', {
				url: '/projects',
				templateUrl: '/partials/projects/main', 
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
		.state('profile', {
				url: '/profile',
				templateUrl: '/partials/account/profile',
				controller: 'wFProfileCtrl',
				resolve: routeRoleChecks.user
		})
		.state('main.email', {
				url: '/email',
				views: {
					'left-pane@main': {templateUrl: '/partials/dashboard/dashboard-email',
										controller: 'wFEmailCtrl'
									},
				}
		})
		.state('main.tasks', {
				url: '/tasks',
				views: {
					'left-pane@main': {templateUrl: '/partials/dashboard/dashboard-tasks',
										controller: 'wFTaskCtrl'
									},
				}
		})
		.state('main.chat', {
				url: '/chat',
				views: {
					'right-pane@main': {templateUrl: '/partials/dashboard/dashboard-chat',
										controller: 'wFChatCtrl'
									},
				}
		})
		.state('main.files', {
				url: '/files',
				views: {
					'right-pane@main': {templateUrl: '/partials/dashboard/dashboard-file-upload'},
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