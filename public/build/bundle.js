/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

 angular.module('app', [
	'ngResource',
	'ngRoute',
	'leaflet-directive',
	'ui.bootstrap',
	'ui.router',
	'bgDirectives',
	'xeditable',
	'angularFileUpload',
	'angularPayments'
]);

angular.module('app').config(['$routeProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider', 
	function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){

	
	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix('');
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
				controller: 'wFMainCtrl'
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
		.state('how-to-use', {
				url: '/how-to-use',
				templateUrl: '/partials/main/how-to-use',
				controller: 'wFHowToCtrl'
		})
		.state('pricing', {
				url: '/pricing',
				templateUrl: '/partials/main/pricing',
				controller: 'wFPricingCtrl'
		})
		.state('contact', {
				url: '/contact',
				templateUrl: '/partials/main/contact',
				controller: 'wFEmailContentCtrl'
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
		.state('projects/getProject/:id/', {
			url: '/projects/getProject/:id/',
			templateUrl: '/partials/projects/edit/get-project',
			controller: 'wFEditProjectCtrl'
		})
		.state('projects/project-details/:id', {
				url: '/projects/project-details/:id',
				templateUrl: '/partials/projects/project-details',
				controller: 'wFProjectDetailsCtrl'
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
		.state('login', {
				url: '/login',
				templateUrl: '/partials/account/login',
				controller: 'wFNavBarLoginCtrl',
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

}]);

angular.module('app').run(['$rootScope', '$location', function($rootScope, $location){
	$rootScope.$on('$routeChangeError',function(evt, current, previous, rejection){
		if(rejection === 'not authorized') {
			$location.path('/');
		}
	})
}]);


/***/ })
/******/ ]);