var Set = require("collections/set");
var SortedSet = require("collections/sorted-set");
var _ = require("lodash");

var ClassCreator = require("./util/class_creator.js");
var Errors = require("./errors.js");
var Student = require("./student.js");
var Timeslots = require("./timeslots.js");

var UniversityClass = ClassCreator.CreateClass(
  function(name, capacity, timeslotData) {
    if ((_.isString(name)) && !(_.isEmpty(name))) {
      this.name = name;
    } else {
      throw new Errors.TypeError("A non-blank name must be provided");
    }
    if ((_.isInteger(capacity)) && (_.gt(capacity, 0))) {
      this.capacity = capacity;
    } else {
      throw new Errors.TypeError("Capacity must be a positive integer greater than zero");
    }

    this.studentList = new Set(null, function(a, b) {
      return a.name === b.name;
    }, function(object) {
      return object.name;
    });

    this.timeslots = new SortedSet(null, function(a, b) {
      return a.value == b.value;
    }, function(a, b) {
      if (a.value > b.value) {
        return 1;
      } else if (a.value == b.value) {
        return 0;
      } else {
        return -1;
      }
    });

    var ucThis = this; // Hold on to 'this' reference for callback function
    if (!_.isUndefined(timeslotData)) {
      if (timeslotData instanceof Array) {
        _.forEach(timeslotData, function(ts) {
          ucThis.addTimeslot(ts);
        });
      } else if (_.values(Timeslots).indexOf(timeslotData) >= 0) {
        this.addTimeslot(timeslotData);
      } else {
        throw new Errors.TypeError("Timeslots passed in must be a single instance or an array of Timeslot objects");
      }
    }
  },
  {
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
      if (student instanceof Student) {
        var result = this.studentList.delete(student);
        if (result != true) {
          throw new Errors.NotFoundError("Cannot remove student \"" + student.name + "\" - not registered for this class");
        }
      } else {
        throw new Errors.TypeError("Must only remove instances of Student");
      }
    },

    classSize: function() {
      return this.studentList.length;
    },

    addTimeslot: function(timeslot) {
      if (_.values(Timeslots).indexOf(timeslot) >= 0) {
        var result = this.timeslots.add(timeslot);
        if (result != true) {
          throw new Errors.DuplicateError("Class already has this timeslot");
        }
      } else {
        throw new Errors.TypeError("Must only add proper Timeslot values");
      }
    },

    removeTimeslot: function(timeslot) {
      if (_.values(Timeslots).indexOf(timeslot) >= 0) {
        var result = this.timeslots.delete(timeslot);
        if (result != true) {
          throw new Errors.NotFoundError("Class already does not have this timeslot");
        }
      } else {
        throw new Errors.TypeError("Must only remove proper Timeslot values");
      }
    },

    creditSize: function() {
      return this.timeslots.length;
    }
  }
);

module.exports = UniversityClass;
