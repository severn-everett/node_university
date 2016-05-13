var chai = require('chai');
var expect = chai.expect;
var _ = require("lodash");

var UniversityClass = require("../lib/university_class.js");
var Student = require("../lib/student.js");
var Timeslots = require("../lib/timeslots.js");

describe('UniversityClass Positive Attributes', function() {
  it("should construct a class with a name and a capacity", function() {
    var introSpanish = new UniversityClass("Introduction to Spanish", 40);
    expect(introSpanish).to.have.property("name");
    expect(introSpanish).to.have.property("capacity");
    expect(introSpanish.capacity).to.equal(40);
    expect(introSpanish.classSize()).to.equal(0);
    expect(introSpanish.creditSize()).to.equal(0);
    expect(introSpanish).to.have.property("timeslots");
  });

  it ("should allow a single timeslot object to be passed in to the constructor", function() {
    var introSpanish = new UniversityClass("Introduction to Spanish", 40, Timeslots.FRIDAY_EVENING);
    expect(introSpanish.timeslots).to.have.length(1);
  });

  it ("should allow timeslot objects to be passed in to the constructor", function() {
    var introSpanish = new UniversityClass("Introduction to Spanish",
      40,
      [Timeslots.TUESDAY_EVENING, Timeslots.WEDNESDAY_EVENING, Timeslots.THURSDAY_EVENING]
    );
    expect(introSpanish.timeslots).to.have.length(3);
  });
});

describe('UniversityClass Negative Attributes', function() {
  it("should require that a name is provided", function() {
    expect(function() {
      var anonClass = new UniversityClass('', 40);
    }).to.throw("A non-blank name must be provided");
  });

  var invalid_capacities = {
    "a string": "Zero",
    "a non-positive integer": 0,
    "a decimal": 10.5
  };

  for (bad_type in invalid_capacities) {
    it("should not allow the student capacity to be " + bad_type, function() {
      expect(function() {
        var emptyClass = new UniversityClass("Introduction to Spanish", invalid_capacities[bad_type]);
      }).to.throw("Capacity must be a positive integer greater than zero");
    });
  }

  it("should only allow either a timeslot object or an array to be passed in as the timeslot data", function() {
    expect(function() {
      var badClass = new UniversityClass("Bad Class", 40, "TUESDAY_EVENING");
    }).to.throw("Timeslots passed in must be a single instance or an array of Timeslot objects");
  });

  it("should not allow an array of invalid objects to be passed in as the timeslot data", function() {
    expect(function() {
      var badClass = new UniversityClass("Bad Class", 40, ["TUESDAY EVENING"]);
    }).to.throw("Must only add proper Timeslot values");
  });
});

describe("UniversityClass Positive Actions", function() {
  var introSpanish = new UniversityClass("Introduction to Spanish", 40);

  describe("UniversityClass Roster", function() {
    var john = new Student("John");
    var jane = new Student("Jane");

    afterEach(function() {
      introSpanish.studentList.clear();
    });

    it("should add students and display its class size", function() {
      introSpanish.addStudent(john);
      introSpanish.addStudent(jane);
      expect(introSpanish.classSize()).to.equal(2);
    });

    it("should allow for removing students", function() {
      introSpanish.addStudent(john);
      introSpanish.addStudent(jane);
      introSpanish.removeStudent(john);
      expect(introSpanish.classSize()).to.equal(1);
    });
  });

  describe("Time Slots", function() {
    afterEach(function() {
      introSpanish.timeslots.clear();
    });

    it("should add time slots and display them in sorted order", function() {
      introSpanish.addTimeslot(Timeslots.MONDAY_AFTERNOON);
      introSpanish.addTimeslot(Timeslots.FRIDAY_AFTERNOON);
      introSpanish.addTimeslot(Timeslots.WEDNESDAY_MORNING);
      expect(introSpanish.creditSize()).to.equal(3);
      var timeslotVals = introSpanish.timeslots.map(function(ts) {
        return ts.value;
      });
      expect(_.isEqual(timeslotVals, [2,7,14])).to.be.true;
    });

    it("should remove time slots and display the results in the correct order", function() {
      introSpanish.addTimeslot(Timeslots.MONDAY_AFTERNOON);
      introSpanish.addTimeslot(Timeslots.FRIDAY_AFTERNOON);
      introSpanish.addTimeslot(Timeslots.WEDNESDAY_MORNING);
      introSpanish.removeTimeslot(Timeslots.MONDAY_AFTERNOON);
      expect(introSpanish.creditSize()).to.equal(2);
      var timeslotVals = introSpanish.timeslots.map(function(ts) {
        return ts.value;
      });
      expect(_.isEqual(timeslotVals, [7,14])).to.be.true;
    });
  });
});

describe("UniversityClass Negative Actions", function() {
  var introSpanish = new UniversityClass("Introduction to Spanish", 2);

  describe("UniversityClass Roster", function() {
    var larry = new Student("Larry");
    var curly = new Student("Curly");
    var moe = new Student("Moe");

    afterEach(function() {
      introSpanish.studentList.clear();
    });

    it("should only allow students to be added to classes", function() {
      expect(function() {
        introSpanish.addStudent("Groucho");
      }).to.throw(Error);
    });

    it("should not allow more students to be added when the class is at capacity", function() {
      expect(function() {
        introSpanish.addStudent(larry);
        introSpanish.addStudent(curly);
      }).to.not.throw(Error);
      expect(function() {
        introSpanish.addStudent(moe);
      }).to.throw("Class is already at capacity of 2");
    });

    it("should not allow a student to be added multiple times", function() {
      introSpanish.addStudent(larry);
      expect(function() {
        introSpanish.addStudent(larry);
      }).to.throw("Student \"Larry\" already added to this class");
    });

    it("should not allow non-students to be removed", function() {
      introSpanish.addStudent(larry);
      expect(function() {
        introSpanish.removeStudent("Larry");
      }).to.throw("Must only remove instances of Student");
    });

    it("should not remove a student that is not registered for the class", function() {
      introSpanish.addStudent(larry);
      expect(function() {
        introSpanish.removeStudent(curly);
      }).to.throw("Cannot remove student \"Curly\" - not registered for this class");
    });
  });

  describe("Time Slots", function() {
    afterEach(function() {
      introSpanish.timeslots.clear();
    });

    it("should not allow a timeslot addition that is not within the established list of timeslots", function() {
      expect(function() {
        introSpanish.addTimeslot("SATURDAY_MORNING");
      }).to.throw("Must only add proper Timeslot values");
    });

    it("should not allow a timeslot to be removed if it is already present", function() {
      introSpanish.addTimeslot(Timeslots.THURSDAY_MORNING);
      expect(function() {
        introSpanish.addTimeslot(Timeslots.THURSDAY_MORNING);
      }).to.throw("Class already has this timeslot");
    });

    it("should not allow a timeslot removal that is not within the established list of timeslots", function() {
      introSpanish.addTimeslot(Timeslots.TUESDAY_AFTERNOON);
      expect(function() {
        introSpanish.removeTimeslot("TUESDAY_NIGHT");
      }).to.throw("Must only remove proper Timeslot values");
    });

    it("should not allow a timeslot to be removed if it is already not present", function() {
      introSpanish.addTimeslot(Timeslots.TUESDAY_AFTERNOON);
      introSpanish.removeTimeslot(Timeslots.TUESDAY_AFTERNOON);
      expect(function() {
        introSpanish.removeTimeslot(Timeslots.TUESDAY_AFTERNOON);
      }).to.throw("Class already does not have this timeslot");
    });
  });
});
