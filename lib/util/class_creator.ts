var _ = require("lodash");

var CreateClass = function(initFunction, memberMap) {
  _.forOwn(memberMap, function(value, key) {
    initFunction.prototype[key] = value;
  });
  return initFunction;
}

var CreateSubClass = function(baseKlass, initFunction, memberMap) {
  initFunction.prototype = Object.create(baseKlass.prototype);
  initFunction.prototype.constructor = initFunction;
  _.forOwn(memberMap, function(value, key) {
    initFunction.prototype[key] = value;
  });
  return initFunction;
}

module.exports = {
  CreateClass: CreateClass,
  CreateSubClass: CreateSubClass
}
