var chai = require("chai");
var expect = chai.expect;
var Student = require("../lib/student.js");
var Timeslots = require("../lib/timeslots.js");
var UniversityClass = require("../lib/university_class.js");

describe("Student Positive Attributes", function() {
  it("should construct a student with a name", function() {
    var severn = new Student("Severn");
    expect(severn).to.have.property("name");
  });
});

describe("Student Negative Attributes", function() {
  it("should fail if no name is provided", function() {
    expect(function() {
      var anon = new Student("");
    }).to.throw("A non-blank name must be provided");
  });
});

describe("Student Positive Actions", function() {
  var severn = new Student("Severn");
  var introSpanish = new UniversityClass("Introduction to Spanish", 40,
    [Timeslots.MONDAY_EVENING, Timeslots.TUESDAY_EVENING, Timeslots.WEDNESDAY_EVENING, Timeslots.THURSDAY_EVENING]
  );
  var currentAffairs = new UniversityClass("Current Affairs", 20,
    [Timeslots.TUESDAY_MORNING, Timeslots.TUESDAY_AFTERNOON, Timeslots.THURSDAY_AFTERNOON]
  );

  afterEach(function() {
    severn.classes.clear();
  });

  it("should register classes without issues", function() {
    severn.registerClass(introSpanish);
    severn.registerClass(currentAffairs);
    expect(severn.classes.length).to.equal(2);
    expect(severn.getCreditCount()).to.equal(7);
  });

  it("should deregister classes without issues", function() {
    expect(function () {
      severn.registerClass(introSpanish);
      severn.registerClass(currentAffairs);
    }).to.not.throw(Error);
    severn.deregisterClass(introSpanish);
    expect(severn.classes.length).to.equal(1);
    expect(severn.getCreditCount()).to.equal(3);
  });
});

describe("Student Negative Actions", function() {
  var severn = new Student("Severn");
  var introSpanish = new UniversityClass("Introduction to Spanish", 40,
    [Timeslots.TUESDAY_EVENING, Timeslots.WEDNESDAY_EVENING, Timeslots.THURSDAY_EVENING]
  );
  var currentAffairs = new UniversityClass("Current Affairs", 20,
    [Timeslots.MONDAY_AFTERNOON, Timeslots.TUESDAY_AFTERNOON, Timeslots.THURSDAY_AFTERNOON]
  );
  var comparativeGovernment = new UniversityClass("Comparative Government", 25,
    [Timeslots.TUESDAY_AFTERNOON, Timeslots.WEDNESDAY_MORNING, Timeslots.THURSDAY_MORNING]
  );

  afterEach(function() {
    severn.classes.clear();
  });

  it("should not register the same class more than once", function () {
    severn.registerClass(introSpanish);
    expect(function() {
      severn.registerClass(introSpanish);
    }).to.throw("Student already registered for this class");
  });

  it("should not deregister a class that the student is not registered for", function() {
    severn.registerClass(introSpanish);
    expect(function() {
      severn.deregisterClass(currentAffairs);
    }).to.throw("Student already not registered for this class");
  });

  it("should not register classes with conflicting time slots", function() {
    severn.registerClass(introSpanish);
    severn.registerClass(currentAffairs);
    expect(function() {
      severn.registerClass(comparativeGovernment);
    }).to.throw("Schedule conflict with another registered class");
  });
});
