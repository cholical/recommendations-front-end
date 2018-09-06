(function () {

  "use strict";
  var app;
  app = angular.module('starter');

  app.factory('productSvc', ['$http', '$log', 'sessionSvc', function productSvc($http, $log, sessionSvc) {

    var urlBase = 'https://ronald-recommendations.azurewebsites.net/api';
    
  	var getProduct = function (id) {
  		var params = {
        productId: id,
        accessToken: sessionSvc.getAccessToken()
      }
  		return $http.post(`${urlBase}/product`, params).then(function (response) {
  			return response.data;
  		});
  	}

    var buy = function (id) {
      var params = {
        productId: id,
        accessToken: sessionSvc.getAccessToken()
      }
      return $http.post(`${urlBase}/buy`, params).then(function (response) {
        return response.data;
      });
    }

    return {
    	getProduct: getProduct,
      buy: buy
    };
  }]);

}());
