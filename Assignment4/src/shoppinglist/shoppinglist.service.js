(function () {
'use strict';

angular.module('ShoppingList')
.service('ShoppingListService', ShoppingListService);


ShoppingListService.$inject = ['$http','$q', '$timeout']
function ShoppingListService($http, $q, $timeout) {
  var service = this;
  var items = [];

  var promise = $http({
    method: "GET",
    url: ("https://davids-restaurant.herokuapp.com/categories.json"),
  });


  promise.then(function (response) {

    var categories = response.data;
  //console.log(categories);
     for( var i = 0; i<categories.length; i++){
       //console.log(categories[i]);

       items.push({
         name: categories[i].name,
         shortname : categories[i].short_name,});
   };

  })
  .catch(function (error) {
    console.log(error);
  })




  // List of shopping items


  // Pre-populate a no cookie list




  // Simulates call to server
  // Returns a promise, NOT items array directly
  service.getItems = function () {
    var deferred = $q.defer();

    // Wait 2 seconds before returning
    $timeout(function () {
      // deferred.reject(items);
      deferred.resolve(items);
    }, 800);

    return deferred.promise;
  };
}

})();
