angular.module('angular-client-side-validation.form-validator', [

])

.provider('formValidator', function(){
  var errorClass;

  this.setErrorClass = function(c){
    errorClass = c;
  }

  this.$get = function($q){
    return {
      validate: function($scope){
        $scope.$parent.$broadcast('show-errors-check-validity');
        if(formCtrl.$invalid){
          return false;
        }
        return true; 
      }
    }
  }

})