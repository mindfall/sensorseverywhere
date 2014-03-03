angular.module('app')
	.controller('wFFundCtrl', function($scope, $http, $q, wFProjectFactory){
		
		$scope.formData = {};

		var projectList = [];
		var projectArray = [];

		projectList = wFProjectFactory.getProjects();
		projectList.then(function(projectList){
			for(var i = 0; i < projectList.length; i++){
				projectArray.push(projectList[i]);
			}
			$scope.projects = projectArray;
		}, function(status){
			console.log(status);
		});

		$scope.projectAdd = function(){
			$http.post('api/projectAdd', $scope.formData)
				.success(function(data) {
					$scope.formData = {}; // clear the form so our user is ready to enter another
					$scope.project = data;
					console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
		};
		
		/*
		$scope.projectDelete = function(id) {
			$http.delete('/api/project/' + id)
				.success(function(data) {
					$scope.project = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		};
		var requiredFunding = $http.get('api/fundAmount');

		requiredFunding.success(function(data, status, headers, config) {
			
			var fundArray = [];
		    var funds = [];

			for(var i = 0; i < data.length; i++){
				fundArray.push(data[i]);
			}
			funds = fundArray.filter(function(elem, pos){
				return fundArray.indexOf(elem) == pos;
			});

			$scope.funds = funds;
			console.log($scope.funds);
	     });
		*/


	}).factory('wFProjectFactory', function($rootScope, $http, $q){

		return {
				getProjects : function(){
					var dfd = $q.defer();
					$http({method: 'GET', url: '/api/projects'})
						.success(function(data, status, headers, config) {
							dfd.resolve(data);
						}).
						error(function(data, status, headers, config){
							dfd.reject(status);
						});
					return dfd.promise;

				}
		} 
	});

