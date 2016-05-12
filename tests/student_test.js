var chai = require('chai');
var expect = chai.expect;
var Student = require("../lib/student.js");

describe('Student', function() {
  it('should construct a student with a name', function() {
    var severn = new Student("Severn");
    expect(severn).to.have.property('name');
  });
  it('should fail if no name is provided', function() {
    expect(function() {
      var anon = new Student('');
    }).to.throw("A non-blank name must be provided");
  });
});
