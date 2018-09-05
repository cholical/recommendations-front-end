(function () {

	'use strict';
	var app;

	app = angular.module('starter');
	app.controller('searchCtrl', ['$scope', '$state', '$stateParams', '$timeout', 'searchSvc', 'sessionSvc', function searchCtrl($scope, $state, $stateParams, $timeout, searchSvc, sessionSvc){

		// $scope.test = function () {
		// 	homeSvc.test().then(function (data) {
		// 		$scope.result = data;
		// 	});
		// }
		$scope.firstName = sessionSvc.getFirstName();
		$scope.lastName = sessionSvc.getLastName();
		if ($scope.firstName == undefined) {
			$state.go('home');
		}

		$scope.searchBox = '';
		$scope.loading = false;

		$scope.search = function () {
			$scope.loading = true;
			$scope.results = undefined;
			searchSvc.search($scope.searchBox).then(function (data) {
				$scope.results = data.results;
				$scope.loading = false;
			});
		}

		$scope.getProduct = function (id) {
			$state.go('product', { id: id })
		}

		$scope.logout = function () {
			sessionSvc.logout().then(function (data) {
				if (data.loggedOut) {
					$state.go('home');
				}
			});
		}
		
	}]);
}());