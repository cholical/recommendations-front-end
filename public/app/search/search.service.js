(function () {

  "use strict";
  var app;
  app = angular.module('starter');

    app.factory('searchSvc', ['$http', '$log', function searchSvc($http, $log) {

    var urlBase = 'https://ronald-recommendations.azurewebsites.net/api';

    var search = function (searchString) {
      return $http.get(`${urlBase}/search?keyword=${searchString}`).then(function (response) {
        return response.data;
      });
    }

    return {
    	search: search
    };
  }]);

}());
