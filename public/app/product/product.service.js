(function () {

  "use strict";
  var app;
  app = angular.module('starter');

  app.factory('productSvc', ['$http', '$log', 'sessionSvc', function productSvc($http, $log, sessionSvc) {

  	var getProduct = function (id) {
  		var params = {
        productId: id,
        accessToken: sessionSvc.getAccessToken()
      }
  		return $http.post("https://localhost:44316/api/product", params).then(function (response) {
  			return response.data;
  		});
  	}

    var buy = function (id) {
      var params = {
        productId: id,
        accessToken: sessionSvc.getAccessToken()
      }
      return $http.post("https://localhost:44316/api/buy", params).then(function (response) {
        return response.data;
      });
    }

    return {
    	getProduct: getProduct,
      buy: buy
    };
  }]);

}());
