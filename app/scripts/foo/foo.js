angular.module('angular-client-side-validation.foo', [

])
.config(function ($locationProvider, $httpProvider) {

})

.controller('AngularClientSideValidationController', function($scope) {
  $scope.foo;
  $scope.fooBar = function(){
    $scope.foo = 'bar';
  }
})  