(function () {
'use strict';

angular.module('App', [])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShareItemsService',ShareItemsService);


ToBuyController.$inject = ['ShareItemsService'];
function ToBuyController(ShareItemsService){
  var toBuy = this;
  toBuy.toBuyList = ShareItemsService.getToBuyList();

  toBuy.empty = ShareItemsService.getToBuyListEmpty();

  toBuy.buyItem = function(itemName){
  ShareItemsService.buyItem(itemName);

    toBuy.empty = ShareItemsService.getToBuyListEmpty();
    //alert(toBuy.empty);
  }

}


AlreadyBoughtController.$inject = ['$scope','ShareItemsService'];
function AlreadyBoughtController($scope,ShareItemsService){
  var alreadyBought = this;
  alreadyBought.empty = ShareItemsService.getBoughtListEmpty();
  alreadyBought.boughtList =ShareItemsService.getBoughtList();

  window.setInterval(function(){
    alreadyBought.empty = ShareItemsService.getBoughtListEmpty();


}, 0.1);

 //alert(alreadyBought.empty);




}

function ShareItemsService() {
var service = this;
var toBuyList = [
  {
    name : 'banana',
    quantity : '2'
  },
  {
    name : 'orange',
    quantity : '5'
  },
  {
    name : 'milk',
    quantity : '3'
  },
  {
    name : 'nuts',
    quantity : '10'
  }
];
var boughtList = [];

service.buyItem = function(item){

  for( var i = 0; i<toBuyList.length; i++){
  if ( toBuyList[i].name === item) {
      var itemName = toBuyList[i].name;
      var itemQuantity = toBuyList[i].quantity;

      var item = {
        name : itemName,
        quantity : itemQuantity

      };
      boughtList.push(item);
      toBuyList.splice(i, 1);

  }

}

};

service.getToBuyList = function (){
  return toBuyList;
};
service.getToBuyListEmpty  = function (){
if(toBuyList.length ==0 )return true;
return false;
};

service.getBoughtList = function (){
  return boughtList;
};
service.getBoughtListEmpty = function (){
  console.log(boughtList.length);
  if(boughtList.length ==0 )return true;
  return false;
};
};

})();
