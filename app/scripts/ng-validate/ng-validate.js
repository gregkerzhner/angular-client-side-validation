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
      scope.touched = false;
      scope.typed = false;

      var inputEl = el[0].querySelector('[name]');
      var inputNgEl = angular.element(inputEl);
      var inputName = inputNgEl.attr('name');
      scope.inputName = inputName;
      console.log('linknig scope with id '+scope.$id + ' and element '+scope.inputName);

      inputNgEl.bind('blur', function(evt){
        scope.$apply(function(){
          if(scope.typed)scope.touched = true;
        }) 
      })

      inputNgEl.bind('keyup', function (evt) {
        if(evt.keyCode === 9) return; 
        scope.$apply(function(){
          scope.typed = true;
        }) 
      });
    },

    controller: function($scope, $element, $attrs, formValidator){
      $scope.errorClass = formValidator.errorClass();

      $scope.$on('show-error-messages', function(){
        $scope.touched = $scope.typed = true;
      });

      $scope.hasError = function(){

        return $scope.touched && $scope.typed && $scope.form[$scope.inputName].$invalid;
      }

      this.showErrorMessage = function(type){
        console.log('Scope '+$scope.$id+' touched: '+$scope.touched+' error '+$scope.form[$scope.inputName].$error[type]);
        return $scope.touched && $scope.typed && $scope.form[$scope.inputName].$error[type]
      }
    }}
})  