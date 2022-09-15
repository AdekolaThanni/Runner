module.exports = class extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.status = "fail";
    this.message = message;

    return this;
  }
};
