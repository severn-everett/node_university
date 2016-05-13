var chai = require('chai');
var expect = chai.expect;

var ClassCreator = require("../lib/util/class_creator.js");

describe("Normal Class", function() {
  it("should create a basic class and object", function() {
    var Person = ClassCreator.CreateClass(
      function(name) {
        this.name = name;
      },
      {
        greet: function() {
          return "Hello, my name is " + this.name + ".";
        },
        nationality: "USA"
      }
    );
    var severn = new Person("Severn");
    expect(severn.greet()).to.equal("Hello, my name is Severn.");
    expect(severn).to.have.property("name");
    expect(severn).to.have.property("nationality");

    var ilya = new Person("Ilya");
    ilya.nationality = "Russia";
    expect(ilya.nationality).to.equal("Russia");
    expect(severn.nationality).to.equal("USA");
  });
});

describe("Sub Class", function() {
  it("should create a sub-class correctly", function() {
    var Person = ClassCreator.CreateClass(
      function(name) {
        this.name = name;
      },
      {
        greet: function() {
          return "Hello, my name is " + this.name + ".";
        },
        nationality: "USA"
      }
    );
    var Student = ClassCreator.CreateSubClass(Person,
      function(name, major) {
        Person.call(this, name);
        this.major = major;
      },
      {
        greet: function() {
          return "Hello, my name is " + this.name + ". I am studying " + this.major + ".";
        }
      }
    );

    var severn = new Student("Severn", "IST");
    expect(severn).to.have.property("nationality");
    expect(severn).to.have.property("major");
    expect(severn.greet()).to.equal("Hello, my name is Severn. I am studying IST.");
  });
});
