// ---SPECS-------------------------

describe('angular-client-side-validation', function () {
  var scope,
    controller;
  
  beforeEach(function () {
    module('angular-client-side-validation');
  });

  describe('AngularClientSideValidationController', function () {
    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller('AngularClientSideValidationController', {
        '$scope': scope
      });
    }));
        
    it('sets the name', function () {
      scope.fooBar();
      expect(scope.foo).toBe('bar');
    });
  });
    
});
