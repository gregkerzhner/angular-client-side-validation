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