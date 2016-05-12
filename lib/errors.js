function TypeError(message) {
  Error.captureStackTrace(this);
  this.message = message;
  this.name = "TypeError";
}
TypeError.prototype = Object.create(Error.prototype);

module.exports = {
  TypeError: TypeError
};
