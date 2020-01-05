(function () {
'use strict';

angular.module('ShoppingList')
.controller('ItemDetailController', ItemDetailController);


ItemDetailController.$inject = ['$http','$stateParams', 'items'];
function ItemDetailController($http,$stateParams, items) {
  //https://davids-restaurant.herokuapp.com/menu_items.json?category=
  var names = [];
  var itemDetail = this;




var short = items[$stateParams.itemId].shortname;
  var promise = $http({
    method: "GET",
    url: ("https://davids-restaurant.herokuapp.com/menu_items.json?category="+short),
  });

  promise.then(function (response) {

      var items = response.data;


  for(var i = 0 ; i < items.menu_items.length;i++){


    names.push({
      name: items.menu_items[i].name,
      description : items.menu_items[i].description});


  };




  itemDetail.namesList = names;




  })
  .catch(function (error) {
    console.log(error);
  })


}

})();
