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

  it("should require that a positive student capacity is provided", function() {
    expect(function() {
      var emptyClass = new Class("Introduction to Spanish", "Zero");
    }).to.throw("Capacity must be a positive integer");
    expect(function() {
      var emptyClass = new Class("Introduction to Spanish", 0);
    }).to.throw("Capacity must be greater than zero");
  });
});

describe("Class Positive Actions", function() {
  var introSpanish = new Class("Introduction to Spanish", 40);

  afterEach(function() {
    introSpanish.studentList.clear();
  });

  it("should add students and display its class size", function() {
    var studentOne = new Student("John");
    var studentTwo = new Student("Jane");
    introSpanish.addStudent(studentOne);
    introSpanish.addStudent(studentTwo);
    expect(introSpanish.classSize()).to.equal(2);
  });

  it("should allow for removing students", function() {
    var studentOne = new Student("John");
    var studentTwo = new Student("Jane");
    introSpanish.addStudent(studentOne);
    introSpanish.addStudent(studentTwo);
    introSpanish.removeStudent(studentOne);
    expect(introSpanish.classSize()).to.equal(1);
  });
});

describe("Class Negative Actions", function() {
  var introSpanish = new Class("Introduction to Spanish", 2);

  afterEach(function() {
    introSpanish.studentList.clear();
  });

  it("should only allow students to be added to classes", function() {
    expect(function() {
      introSpanish.addStudent("Jane");
    }).to.throw(Error);
  });

  it("should not allow more students to be added when the class is at capacity", function() {
    var studentOne = new Student("Larry");
    var studentTwo = new Student("Curly");
    var studentThree = new Student("Moe");
    expect(function() {
      introSpanish.addStudent(studentOne);
      introSpanish.addStudent(studentTwo);
    }).to.not.throw(Error);
    expect(function() {
      introSpanish.addStudent(studentThree);
    }).to.throw("Class is already at capacity of 2");
  });

  it("should fail to remove students when there are no students registered for the class", function() {
    var studentOne = new Student("Larry");
    var studentTwo = new Student("Curly");
    var studentThree = new Student("Moe");

    introSpanish.addStudent(studentOne);
    introSpanish.removeStudent(studentOne);
    expect(function() {
      introSpanish.removeStudent(studentTwo);
    }).to.throw("Class is already empty");
  });
});
