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