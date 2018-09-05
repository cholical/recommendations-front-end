(function () {

  'use strict';
  var app = angular.module('starter', ['ui.router', 'ui.bootstrap', 'ui.bootstrap.modal', 'ngCookies', 'angular-encryption']);

  app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', configRoutes]);

  function configRoutes ($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'homeCtrl'
      })
      .state('product', {
        url: '/product/:id',
        templateUrl: 'app/product/product.html',
        controller: 'productCtrl'
      })
      .state('search', {
        url: '/search',
        templateUrl: 'app/search/search.html',
        controller: 'searchCtrl'
      });

    $urlRouterProvider.otherwise('/home');

    // $locationProvider.html5Mode({
    //   enabled: true
    // });

  };

  app.run(['$rootScope', '$timeout', '$state', '$cookies', 'sessionSvc', function ($rootScope, $timeout, $state, $cookies, sessionSvc) {
    sessionSvc.setCredentialsFromCookies();
  }]);

}());
