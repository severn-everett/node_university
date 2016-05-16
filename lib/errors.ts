function TypeError(message) {
  Error.captureStackTrace(this);
  this.message = message;
  this.name = "TypeError";
}
TypeError.prototype = Object.create(Error.prototype);

function OutOfRangeError(message) {
  Error.captureStackTrace(this);
  this.message = message;
  this.name = "OutOfRangeError";
}
OutOfRangeError.prototype = Object.create(Error.prototype);

function DuplicateError(message) {
  Error.captureStackTrace(this);
  this.message = message;
  this.name = "DuplicateError";
}
DuplicateError.prototype = Object.create(Error.prototype);

function NotFoundError(message) {
  Error.captureStackTrace(this);
  this.message = message;
  this.name = "NotFoundError";
}
NotFoundError.prototype = Object.create(Error.prototype);

module.exports = {
  TypeError: TypeError,
  OutOfRangeError: OutOfRangeError,
  DuplicateError: DuplicateError,
  NotFoundError: NotFoundError
};
