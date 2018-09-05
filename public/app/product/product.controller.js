(function () {

	'use strict';
	var app;

	app = angular.module('starter');
	app.controller('productCtrl', ['$scope', '$state', '$stateParams', 'productSvc', 'sessionSvc', function productCtrl($scope, $state, $stateParams, productSvc, sessionSvc){

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

		$scope.bought = false;
		$scope.loading = true;

		productSvc.getProduct($stateParams.id).then(function (data) {
			$scope.product = data.product;
			$scope.recommendations = data.recommendations;
			$scope.loading = false;
		});

		$scope.getProduct = function (id) {
			$state.go('product', { id: id })
		}

		$scope.buy = function () {
			$scope.loading = true;
			productSvc.buy($stateParams.id).then(function (data) {
				$scope.bought = true;
				$scope.loading = false;
			});
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