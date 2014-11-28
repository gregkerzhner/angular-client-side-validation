(function(module) {
try { module = angular.module("angular-client-side-validation.templates"); }
catch(err) { module = angular.module("angular-client-side-validation.templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("",
    "<div>foo</div>");
}]);
})();
