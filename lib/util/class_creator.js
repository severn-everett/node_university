var CreateClass = function(initFunction, memberMap) {
  for (mem in memberMap) {
    if (memberMap.hasOwnProperty(mem)) {
      initFunction.prototype[mem] = memberMap[mem];
    }
  }
  return initFunction;
}

var CreateSubClass = function(baseKlass, initFunction, memberMap) {
  initFunction.prototype = Object.create(baseKlass.prototype);
  initFunction.prototype.constructor = initFunction;
  for (mem in memberMap) {
    if (memberMap.hasOwnProperty(mem)) {
      initFunction.prototype[mem] = memberMap[mem];
    }
  }
  return initFunction;
}

module.exports = {
  CreateClass: CreateClass,
  CreateSubClass: CreateSubClass
}
