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
