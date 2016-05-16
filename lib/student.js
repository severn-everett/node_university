var Set = require("collections/set");
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

    this.classes = new Set(null,
      function(a, b) {
        return a.name === b.name;
      },
      function(obj) {
        return obj.name;
      }
    );
  },
  {
    registerClass: function(universityClass) {
      if (universityClass instanceof UniversityClass) {
        if (!this.classes.has(universityClass)) {
          if (this.classes.every(function (uClass) {
              return uClass.getTimeslots().intersection(universityClass.getTimeslots()).length == 0;
            })) {
              this.classes.add(universityClass);
          } else {
            throw new Errors.DuplicateError("Schedule conflict with another registered class");
          }
        } else {
          throw new Errors.DuplicateError("Student already registered for this class");
        }
      } else {
        throw new Errors.TypeError("Only instances of University Class may be registered");
      }
    },

    deregisterClass: function(universityClass) {
      if (universityClass instanceof UniversityClass) {
        if (this.classes.has(universityClass)) {
          this.classes.delete(universityClass);
        } else {
          throw new Errors.DuplicateError("Student already not registered for this class");
        }
      } else {
        throw new Errors.TypeError("Only instances of University Class may be deregisered");
      }
    },

    getCreditCount: function() {
      return this.classes.reduce(
        function(base, uClass) {
          return base + uClass.getTimeslots().length;
        },
        0
      );
    }
  }
);

module.exports = Student;

var UniversityClass = require("./university_class.js"); // Placed after model.exports to avoid circular dependency issues

