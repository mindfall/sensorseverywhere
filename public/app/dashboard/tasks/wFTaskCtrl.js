angular.module('app')
	.controller('wFTaskCtrl', ['$scope', 'wFTaskFactory', 'wFGroupFactory', 'wFIdentity',
		function($scope, wFTaskFactory, wFGroupFactory, wFIdentity) {

			var user = wFIdentity.currentUser;

			$scope.saveTask = function(pid, taskPriority, taskName, taskDesc, taskOwner, taskStatus) {

				
				var taskData = {
					pid: pid,
					taskPriority: taskPriority,
					taskName: taskName,
					taskDescription: taskDesc,
					taskOwner: taskOwner,
					taskStatus: taskStatus
				};
				
				addTaskToProject = wFTaskFactory.addTaskToProject(taskData);
				addTaskToProject.then(function(task) {
					//console.log(task);
				}, function(status) {
					//console.log(status);
				});
			}

			$scope.addTask = function() {
				var task = {
					id: $scope.tasks.length,
					priority: 0,
					name: 'Enter task name...',
					description: 'Enter task description...',
					owner: "",
					status: 0
				};
				$scope.tasks.push(task);
			}

			$scope.removeTask = function(index) {
				$scope.tasks.splice(index, 1);
			}

			$scope.uploadTaskFile = function() {
				console.log('uploading task file');
			}

			$scope.findActiveMembers = function(project) {
				
				var selectOwner = [];
				var activeMembers = wFTaskFactory.findActiveGroupMembers(project);
				
				activeMembers.then(function(data) {

					for(var i = 0; i < data.length; i++) {

						for(var j = 0; j < data[i].groupMembers.length; j++) {
							var ownerAttrs = {
								name: data[i].groupMembers[j].username.toString(),
								value: data[i].groupMembers[j].username.toString()
							}
							selectOwner.push(ownerAttrs);
						}
						$scope.selectOwner = selectOwner;
						$scope.setOwner = {type: $scope.selectOwner[0].value};

						console.log($scope.selectOwner);
					}
				});
			}

			$scope.selectPriority = [
				{name: 'urgent', value: 'urgent'},
				{name: 'high', value: 'high'},
				{name: 'normal', value: 'normal'},
				{name: 'low', value: 'low'}
			];
			$scope.setPriority = {type: $scope.selectPriority[0].value};
			


			$scope.selectStatus = [
				{name: 'new', value: 'new'},
				{name: 'in_progress', value: 'in progress'}
			];
			$scope.setStatus = {type: $scope.selectStatus[0].value};
/*
			$scope.tasks = [
				{
					id: 1,
					priority: 0,
					name: 'Enter task name...',
					description: 'Enter task description...',
					owner: "",
					status: 0

				}
			];*/

			$scope.findActiveMembers();

}]);