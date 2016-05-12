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
    if (check.integer(capacity)) {
      if (check.greater(capacity, 0)) {
        this.capacity = capacity;
      } else {
        throw new Errors.TypeError("Capacity must be greater than zero");
      }
    } else {
      throw new Errors.TypeError("Capacity must be a positive integer");
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
        this.studentList.add(student);
      } else {
        throw new Error("Class is already at capacity of " + this.capacity);
      }
    } else {
      throw new Errors.TypeError("Must only add instances of Student");
    }
  },

  removeStudent: function(student) {
    if (this.classSize() > 0) {
      this.studentList.delete(student);
    } else {
      throw new Error("Class is already empty");
    }
  },

  classSize: function() {
    return this.studentList.length;
  }
});

module.exports = Class;
