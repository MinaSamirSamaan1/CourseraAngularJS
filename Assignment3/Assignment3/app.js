(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");;


NarrowItDownController.$inject = ['$scope','MenuSearchService'];
function NarrowItDownController($scope,MenuSearchService){
  var controller = this;

  $scope.search = "";
  controller.found = [];

  controller.isEmpty  = function (){
  if(controller.found.length ==0 )return true;
  return false;
  };

  controller.remove = function(itemName){


    for( var i = 0; i<controller.found.length; i++){
      if(controller.found[i].name.toUpperCase() === itemName.toUpperCase()){
          controller.found.splice(i, 1);
      }
  }


  }


  controller.logMenuItems = function () {
    controller.found = [];
    var promise = MenuSearchService.getMenuItems();

    promise.then(function (response) {
    //  console.log(response.menu_items);
         for( var i = 0; i<response.data.menu_items.length; i++){

           var searchTerm = $scope.search;
          if(searchTerm !== ""){ if(response.data.menu_items[i].name.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1){



              var item = response.data.menu_items[i].name + ' , ' +response.data.menu_items[i].description;

              var item = {
                name : response.data.menu_items[i].name,
                description : response.data.menu_items[i].description

              };
               controller.found.push(item);
           }};
       };
       console.log(controller.found.length);

    })
    .catch(function (error) {
      console.log(error);
    })

  };
  //
  // toBuy.empty = MenuSearchService.getToBuyListEmpty();
  //
  // toBuy.buyItem = function(itemName){
  // MenuSearchService.buyItem(itemName);
  //
  //   toBuy.empty = MenuSearchService.getToBuyListEmpty();
  //   //alert(toBuy.empty);
  // }

}



MenuSearchService.$inject = ['$http', 'ApiBasePath'];

function MenuSearchService($http, ApiBasePath) {
var service = this;
var menuItems = [];
var matching = [];
service.getMenuItems = function () {
  var response = $http({
    method: "GET",
    url: (ApiBasePath + "/menu_items.json"),
  });
  return response;
};




};

})();
