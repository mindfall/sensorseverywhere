angular.module('app').controller('wFTaskCtrl', ['$scope', 'wFTaskFactory', function($scope, wFTaskFactory) {


	$scope.saveTask = function(pid, taskPriority, taskName, taskDesc, taskOwner, taskStatus) {

		var taskData = {
			pid: pid,
			taskPriority: taskPriority,
			taskName: taskName,
			taskDescription: taskDesc,
			taskOwner: taskOwner,
			taskStatus: taskStatus
		};
		console.log(taskData);
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


	$scope.selectPriority = [
		{name: 'urgent', value: 'urgent'},
		{name: 'high', value: 'high'},
		{name: 'normal', value: 'normal'},
		{name: 'low', value: 'low'}
	];
	$scope.setPriority = {type: $scope.selectPriority[0].value};

	//Needs to get a list of group contributors from db
	$scope.selectOwner = [
		{name: 'wade', value: 'wade'},
		{name: 'joe', value: 'joe'},
		{name: 'soph', value: 'soph'}
	];
	$scope.setOwner = {type: $scope.selectOwner[0].value};

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

}]);