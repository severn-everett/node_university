var Base = require('basejs');
var check = require('check-types');

var Errors = require("./errors.js");

var Student = Base.extend({
  constructor: function(name) {
    if (check.nonEmptyString(name)) {
      this.name = name;
    } else {
      throw new Errors.TypeError("A non-blank name must be provided");
    }
  }
});

module.exports = Student;
