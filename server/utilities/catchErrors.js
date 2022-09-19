const constructError = require("../utilities/constructError");

module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => {
      next(new constructError(400, error.message));
    });
  };
};
