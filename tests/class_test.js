var chai = require('chai');
var expect = chai.expect;
var Class = require("../lib/class.js");
var Student = require("../lib/student.js");

describe('Class Positive Attributes', function() {
  it("should construct a class with a name and a capacity", function() {
    var introSpanish = new Class("Introduction to Spanish", 40);
    expect(introSpanish).to.have.property("name");
    expect(introSpanish).to.have.property("capacity");
    expect(introSpanish.capacity).to.equal(40);
  });
});

describe('Class Negative Attributes', function() {
  it("should require that a name is provided", function() {
    expect(function() {
      var anonClass = new Class('', 40);
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
        var emptyClass = new Class("Introduction to Spanish", invalid_capacities[bad_type]);
      }).to.throw("Capacity must be a positive integer greater than zero");
    });
  }
});

describe("Class Positive Actions", function() {
  var introSpanish = new Class("Introduction to Spanish", 40);
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

describe("Class Negative Actions", function() {
  var introSpanish = new Class("Introduction to Spanish", 2);
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

  it("should fail to remove students when there are no students registered for the class", function() {
    introSpanish.addStudent(larry);
    introSpanish.removeStudent(larry);
    expect(function() {
      introSpanish.removeStudent(curly);
    }).to.throw("Class is already empty");
  });

  it("should not remove a student that is not registered for the class", function() {
    introSpanish.addStudent(larry);
    expect(function() {
      introSpanish.removeStudent(curly);
    }).to.throw("Cannot remove student \"Curly\" - not registered for this class");
  });
});
