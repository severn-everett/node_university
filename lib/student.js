var _ = require("lodash");

var ClassCreator = require("./util/class_creator.js");
var Errors = require("./errors.js");

var Student = ClassCreator.CreateClass(
  function(name) {
    if ((_.isString(name)) && !(_.isEmpty(name))) {
      this.name = name;
    } else {
      throw new Errors.TypeError("A non-blank name must be provided");
    }
  }
);

module.exports = Student;
