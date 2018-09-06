(function () {

  "use strict";
  var app;
  app = angular.module('starter');

  app.factory('homeSvc', ['$http', '$log', '$cookies', 'sha256', 'sessionSvc', function homeSvc($http, $log, $cookies, sha256, sessionSvc) {

      var urlBase = 'https://ronald-recommendations.azurewebsites.net/api';

      var test = function () {
  		var params = {
        test: ''
      }
  		return $http.post('/test', params).then(function (response) {
  			return response.data;
  		});
  	}

    var createUser = function (createCredentials) {
      var params = angular.copy(createCredentials);
      params.password = sha256.convertToSHA256(params.password);
      delete params.confirmPassword;
      return $http.post(`${urlBase}/createuser`, params).then(function (response) {
        if (response.data.repeatUsername) {
          return response.data;
        } else {
          sessionSvc.setCredentials(response.data.firstName, response.data.lastName, response.data.accessToken);
          return response.data;
        }
      });
    }

    var login = function (credentials) {
      var params = angular.copy(credentials);
      params.password = sha256.convertToSHA256(params.password);
      return $http.post(`${urlBase}/login`, params).then(function (response) {
        if (response.data.incorrectCredentials) {
          return response.data;
        } else {
          sessionSvc.setCredentials(response.data.user.properties.firstName[0].value, response.data.user.properties.lastName[0].value, response.data.accessToken);
          return response.data;
        }
      });
    }

    return {
    	test: test,
      createUser: createUser,
      login: login
    };
  }]);

}());
