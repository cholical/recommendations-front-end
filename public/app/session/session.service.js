(function () {

  "use strict";
  var app;
  app = angular.module('starter');

  app.factory('sessionSvc', ['$http', '$log', '$state', '$cookies', function sessionSvc($http, $log, $state, $cookies) {

    var urlBase = 'https://ronald-recommendations.azurewebsites.net/api';
  	var firstName;
    var lastName;
    var accessToken;

    var setCredentials = function (pFirstName, pLastName, pAccessToken) {
      $cookies.put('accessTokenCookie', pFirstName);
      $cookies.put('firstNameCookie', pLastName);
      $cookies.put('lastNameCookie', pAccessToken);
      setCredentialsFromCookies();
    }

    var setCredentialsFromCookies = function () {
      firstName = $cookies.get('accessTokenCookie');
      lastName = $cookies.get('firstNameCookie');
      accessToken = $cookies.get('lastNameCookie');
    }

    var getFirstName = function () {
      return firstName;
    }

    var getLastName = function () {
      return lastName;
    }

    var getAccessToken = function () {
      return accessToken;
    }

    var logout = function () {
      var params = {
        accessToken: getAccessToken()
      }
      return $http.post(`${urlBase}/logout`, params).then(function (response) {
        firstName = undefined;
        lastName = undefined;
        accessToken = undefined;
        $cookies.remove('accessTokenCookie');
        $cookies.remove('firstNameCookie');
        $cookies.remove('lastNameCookie');
        return {
          loggedOut: true
        }
      });
    }

    return {
    	setCredentials: setCredentials,
      setCredentialsFromCookies: setCredentialsFromCookies,
      getAccessToken: getAccessToken,
      getFirstName: getFirstName,
      getLastName: getLastName,
      logout: logout
    };
  }]);

}());
