describe('form-validator', function(){ 
  var fv, scope;
  beforeEach(module('angular-client-side-validation'));

  beforeEach(function(){
    module( function ( formValidatorProvider ) {
      formValidatorProvider.setErrorClass('foo');
    });

    inject(function (formValidator, $rootScope) {
      fv = formValidator;
      scope = $rootScope;
    });
  })


  it("sets touched to false initially", function() {    
    expect(fv.errorClass()).toBe('foo')
  });

  it("broadcasts event if scope is invalid", function(){
    var child = scope.$new();
    scope.baz = {$invalid: true}
    var intercepted;
    child.$on('show-error-messages', function(){
      intercepted = true;
    })

    fv.validate(scope, 'baz');
    expect(intercepted).toBe(true)
  })
})
