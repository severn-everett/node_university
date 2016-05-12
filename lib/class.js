var Base = require("basejs");
var Set = require("collections/set");
var check = require("check-types");

var Student = require("./student.js");
var Errors = require("./errors.js");

var Class = Base.extend({
  constructor: function(name, capacity) {
    if (check.nonEmptyString(name)) {
      this.name = name;
    } else {
      throw new Errors.TypeError("A non-blank name must be provided");
    }
    if ((check.integer(capacity)) && (check.greater(capacity, 0))) {
      this.capacity = capacity;
    } else {
      throw new Errors.TypeError("Capacity must be a positive integer greater than zero");
    }
    this.studentList = new Set(null, function(a, b) {
      return a.name === b.name;
    }, function(object) {
      return object.name;
    });
  },
  
  addStudent: function(student) {
    if (student instanceof Student) {
      if ((this.classSize() + 1) <= this.capacity) {
        var result = this.studentList.add(student);
        if (result != true) {
          throw new Errors.DuplicateError("Student \"" + student.name + "\" already added to this class");
        }
      } else {
        throw new Errors.OutOfRangeError("Class is already at capacity of " + this.capacity);
      }
    } else {
      throw new Errors.TypeError("Must only add instances of Student");
    }
  },

  removeStudent: function(student) {
    if (this.classSize() > 0) {
      var result = this.studentList.delete(student);
      if (result != true) {
        throw new Errors.NotFoundError("Cannot remove student \"" + student.name + "\" - not registered for this class");
      }
    } else {
      throw new Errors.OutOfRangeError("Class is already empty");
    }
  },

  classSize: function() {
    return this.studentList.length;
  }
});

module.exports = Class;
