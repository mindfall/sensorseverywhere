angular.module('app').controller('wFTaskCtrl', function($scope) {

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

	$scope.addTask = function() {
		$scope.inserted = {
			id: $scope.tasks.length + 1,
			priority: 0,
			name: "Enter name",
			description: "Enter description",
			owner: "",
			status: 0
		};
		$scope.tasks.push($scope.inserted);
	}

	$scope.saveTask = function() {
		console.log('save task, create wFProjectFactory method and save out to server. Best to make an insert into the project table. (Remember to create a task array + wildlife + in the project model');
	}

	$scope.removeTask = function(index) {
		$scope.tasks.splice(index, 1);
	}

	
	$scope.tasks = [
		{
			id: 1,
			priority: 0,
			name: "Clean Up",
			description: "Clean up site to find locations for monitors.",
			owner: "Joe",
			status: 0
		},
		{
			id: 2,
			priority: 0,
			name: "Purchase Monitors",
			description: "Best place to do this?.",
			owner: "Joe",
			status: 0

		},
		{
			id: 3,
			priority: 2,
			name: "Calculate work data",
			description: "Create scope for project.",
			owner: "Nancy",
			status: 0

		},
		{
			id: 4,			
			priority: 0,
			name: "Volunteers",
			description: "Find volunteers.",
			owner: "Wade",
			status: 0

		}
	];

});