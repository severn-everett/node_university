var navApp = angular.module("navApp", []);
navApp.controller("navController", function($scope) {
  $scope.showStudents = function() {
    focusButton("showStudents", "showClasses");
  };

  $scope.showClasses = function() {
    focusButton("showClasses", "showStudents");
  };
});

function focusButton(focused, unfocused) {
  var fButton = $("#"+focused);
  var uButton = $("#"+unfocused);

  uButton.removeClass("btn-primary");
  uButton.addClass("btn-default");

  fButton.removeClass("btn-default");
  fButton.addClass("btn-primary");
}
