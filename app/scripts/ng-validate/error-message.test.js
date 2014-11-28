describe('error-message', function(){ 
  var element, $compile, formScope, ngValidateScope, errorMessageRequiredScope,  errorMessageSnacksScope , $exceptionHandler, $compileProvider;

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

    errorMessageRequiredScope = angular.element(element.find('p')[0]).scope();
    ngValidateScope = angular.element(element.find('div')[0]).scope();
  }));

  it('does not show error messages at first', function(){
    expect(errorMessageRequiredScope.show()).toBe(false)
  })

  it('shows error messages', function(){
    ngValidateScope.form['password'].$error['required'] = true;
    ngValidateScope.touched = ngValidateScope.typed = true;
    expect(errorMessageRequiredScope.show()).toBe(true) 
  })
})
