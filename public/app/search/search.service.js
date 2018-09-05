(function () {

  "use strict";
  var app;
  app = angular.module('starter');

  app.factory('searchSvc', ['$http', '$log', function searchSvc($http, $log) {

  	var test = function () {
  		var params = {
        test: ""
      }
  		return $http.post("/test", params).then(function (response) {
  			return response.data;
  		});
  	}

    var search = function (searchString) {
      return $http.get(`https://localhost:44316/api/search?keyword=${searchString}`).then(function (response) {
        return response.data;
      });
    }

    return {
    	search: search
    };
  }]);

}());
