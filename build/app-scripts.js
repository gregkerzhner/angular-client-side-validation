angular.module('angular-client-side-validation', [  
  'angular-client-side-validation.ng-validate',
  'angular-client-side-validation.form-validator',
  'angular-client-side-validation.error-message'
])
.config(function ($locationProvider, $httpProvider) {

}) 
.run(function($timeout, $rootScope, $location){

})


angular.module("angular-client-side-validation.config", [])

.constant("ENV", {})

;
angular.module('angular-client-side-validation.error-message', [

])
.directive('errorMessage', function(formValidator){
  return {
    template: '<span ng-if="show()" ng-transclude></span>',
    transclude: true,
    scope: true,
    require: '^ngValidate',
    link: function(scope, el, attrs, parent){
      scope.show = function(){
        return parent.showErrorMessage(attrs.errorType)
      }
    }
  }
})

angular.module('angular-client-side-validation.form-validator', [

])

.provider('formValidator', function(){
  var errorClass;

  this.setErrorClass = function(c){
    errorClass = c;
  }

  this.$get = function($q){
    return {
      errorClass: function(){
        return errorClass || 'field-error';
      },

      validate: function($scope){
        if($scope.form.$invalid){
          $scope.$broadcast('show-error-messages');
        }
        return true;  
      }
    }
  }

})
angular.module('angular-client-side-validation.ng-validate', [

])
.directive("ngValidate", function(formValidator) {
  return {
    restrict: 'A',
    require: '^form',
    transclude: true,
    scope: true,
    template: '<div ng-class="{true: errorClass, false: \'\'}[hasError()]"> <ng-transclude/></div>', 
    link: function(scope, el, attrs, formCtrl, transclude){
      scope.form = formCtrl;
      var inputEl = el[0].querySelector('[name]');

      var inputNgEl = angular.element(inputEl);
      var inputName = inputNgEl.attr('name');
      scope.inputName = inputName;

      inputNgEl.bind('blur', function(evt){
        scope.onBlur();
      })

      inputNgEl.bind('keyup', function (evt) {
        scope.onKeyup(evt);
      });
    },

    controller: function($scope, $element, $attrs, formValidator){
      $scope.errorClass = formValidator.errorClass();

      $scope.touched = false;
      $scope.typed = false; 

      $scope.onKeyup = function(evt){
        if(evt.keyCode === 9) return; 
        $scope.$apply(function(){
          $scope.typed = true;
        }) 
      }

      $scope.onBlur = function(){
        $scope.$apply(function(){
          if($scope.typed)$scope.touched = true;
        })  
      }


      $scope.$on('show-error-messages', function(){
        $scope.touched = $scope.typed = true;
      });

      $scope.hasError = function(){
        return $scope.touched && $scope.typed && $scope.form[$scope.inputName].$invalid;
      }

      this.showErrorMessage = function(type){
       return $scope.touched && $scope.typed && $scope.form[$scope.inputName].$error[type]
      }
    }}
})  