(function () {
'use strict';

angular.module('App', [])
.controller('Controller',MsgController);

MsgController.$inject = ['$scope'];
function MsgController($scope) {
  $scope.state = "";
  $scope.food ="";

  $scope.count = function () {

    var length =   $scope.food.split(',').length;
    var splitted =  $scope.food.split(',');
    splitted.forEach(removeEmpty);

    function removeEmpty(item, index) {
      if(item == "")
      length -= 1;
}
    console.log(length);
    if(length < 4) $scope.state = "Enjoy!";
    else  $scope.state = "Too Much!";
  };

  $scope.feedYaakov = function () {
    $scope.stateOfBeing = "fed";
  };
}

})();
