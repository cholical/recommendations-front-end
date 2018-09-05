(function () {

	'use strict';
	var app;

	app = angular.module('starter');
	app.controller('homeCtrl', ['$scope', '$state', 'homeSvc', 'sessionSvc', function homeCtrl($scope, $state, homeSvc, sessionSvc){

		// $scope.test = function () {
		// 	homeSvc.test().then(function (data) {
		// 		$scope.result = data;
		// 	});
		// }

		if (sessionSvc.getAccessToken() != undefined) {
			$state.go('search');
		}

		var baseCreateCredentials = {
			firstName: '',
			lastName: '',
			username: '',
			password: '',
			confirmPassword: ''
		}

		var baseCredentials = {
			username: '',
			password: '',
			confirmPassword: ''
		}

		$scope.createCredentials = {
			firstName: '',
			lastName: '',
			username: '',
			password: '',
			confirmPassword: ''
		};

		$scope.credentials = {
			username: '',
			password: '',
			confirmPassword: ''
		};

		$scope.createUserDisplay = true;
		$scope.repeatUsername = false;

		$scope.createUser = function () {
			console.log('Create user called');
			homeSvc.createUser($scope.createCredentials).then(function (data) {
				if (data.repeatUsername) {
					$scope.repeatUsername = true;
				}
				$state.go('search');
			});
		}

		$scope.login = function () {
			console.log('login called');
			homeSvc.login($scope.credentials).then(function (data) {
				if (data.incorrectCredentials) {
					$scope.incorrectCredentials = true;
				}
				$state.go('search');
			})
		}

		$scope.changeCreateUserDisplay = function (change) {
			$scope.createUserDisplay = change;
			$scope.createCredentials = angular.copy(baseCreateCredentials);
			$scope.credentials = angular.copy(baseCredentials);
			$scope.incorrectCredentials = false;
			$scope.repeatUsername = false;
		}

	}]);
}());