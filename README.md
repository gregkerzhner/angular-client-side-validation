### Angular Client Side Validation

Unintrusive, awesome form messaging for your Angular.js application.
[Demo](http://plnkr.co/edit/qeRAiDuyKpaM7l6RjxmV?p=preview) 

### Installation
```
$ bower install angular-client-side-validation
```

### Usage
```
<div class="form-group" ng-validate>
  <label class="control-label">Email</label>
  <input type="email" class="input input-lg form-control" ng-model="credentials.email" name="email" required>
  <p error-message error-type='required'>Email is required</p>
  <p error-message error-type='email'>Email is invalid</p>
</div>
```

### Documentation 

This is a set of two directives.  

* The first (ng-validate) is a container.  It is meant to wrap your input, label and error messages.            
* The second (error-message) goes inside the ng-validate directive.  You can place as many error message directives as you want into one ng-validate directive.  It takes one argument (error-type).  In the example above, the first error message would show up if the user has not filled out a required field, and the second when the user enters something, but not in a valid email format.   

Also included is a formValidation provider and service with the following api

Set the css class to wrap invalid inputs and error messages in application wide
```
.config(function(formValidatorProvider){
  formValidatorProvider.setErrorClass('foo')
})
```

Check validity of the form and show any error messages if invalid (useful on form submission)
```
formValidator.validate($scope, formName);
```
Arguments are
* scope: Any scope which has a form controller attached to it
* formName: name of form
Together, these arguments are looked up like $scope[formName] to access the formController

###Contributing
Yep.
To set up the project
```
npm install
bower install
gulp
```

To run tests
```
gulp unit-test
```

###Liscence
MIT