describe('ng-validate', function(){
  var element, $compile, formScope, ngValidateScope, $exceptionHandler, $compileProvider;

  beforeEach(module('angular-client-side-validation'));

  beforeEach(inject(function(_$compile_, $rootScope, _$exceptionHandler_) {
    $compile = _$compile_;
    $exceptionHandler = _$exceptionHandler_;
    formScope = $rootScope.$new();

    element =  $compile('<form name="hi"><div class="form-group" ng-validate>' +
        '<label class="control-label">Password</label>'+
        '<input id="foo" type="password" class="input input-lg form-control" ng-model="credentials.password" name="password" required>'+
        '<p error-message error-type="required">Password is required</p>'+
      '</div></form>')(formScope);

    ngValidateScope = angular.element(element.find('div')[0]).scope();
  }));


  it("sets touched to false initially", function() {    
    expect(ngValidateScope.touched).toBe(false)
  });

  it("sets typed to false initially", function() {    
    expect(ngValidateScope.typed).toBe(false)
  });

  it('sets touched on keyup', function(){
    angular.element(element.find('input')).triggerHandler('keyup')
    expect(ngValidateScope.typed).toBe(true)
  })

  it('does not set touched on tab event', function(){
    ngValidateScope.onKeyup({keyCode: 9})
    expect(ngValidateScope.typed).toBe(false)
  })

  it('does not set touched on blur if typed', function(){
    angular.element(element.find('input')).triggerHandler('blur')
    expect(ngValidateScope.touched).toBe(false)
  })


  it('sets touched if typed', function(){
    ngValidateScope.typed = true;
    angular.element(element.find('input')).triggerHandler('blur')
    expect(ngValidateScope.touched).toBe(true)
  })

  it('sets touched and typed on show-error-messages event', function(){
    formScope.$broadcast('show-error-messages')
    expect(ngValidateScope.touched).toBe(true)
    expect(ngValidateScope.typed).toBe(true)
  })
})
