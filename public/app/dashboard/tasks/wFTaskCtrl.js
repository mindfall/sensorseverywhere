angular.module('app')
	.controller('wFTaskCtrl', ['$scope', 'wFTaskFactory', 'wFGroupFactory', 
		function($scope, wFTaskFactory, wFGroupFactory) {


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
					console.log(task);
				}, function(status) {
					console.log(status);
				});
			}

			$scope.addTask = function() {
				var task = {
					id: $scope.tasks.length + 1,
					priority: 0,
					name: 'Enter task name...',
					description: 'Enter task description...',
					owner: "",
					status: 0
				};
				$scope.tasks.push(task);
				console.log('task added')
			}

			$scope.removeTask = function(index) {
				$scope.tasks.splice(index, 1);
			}

			$scope.uploadTaskFile = function() {
				console.log('uploading task file');
			}

			$scope.getGroupMembers = function() {
				var selectOwner = [];
				var groupMembers = wFGroupFactory.getGroupsByUser();
				
				groupMembers.then(function(members) {
					for(var i = 0; i < members.length; i++) {
						console.log(members[i]);
						var ownerAttrs = {
							name: members[i].username,
							value: members[i].username
						}
						selectOwner.push(ownerAttrs);
					}

					$scope.selectOwner = selectOwner;
		//			$scope.setOwner = {type: $scope.selectOwner[0].value};
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

			$scope.tasks = [
				{
					id: 1,
					priority: 0,
					name: 'Enter task name...',
					description: 'Enter task description...',
					owner: "",
					status: 0

				}
			];

			$scope.getGroupMembers();

}]);