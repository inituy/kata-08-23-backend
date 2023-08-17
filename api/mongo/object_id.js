module.exports = function mongoObjectId(value) {
  return require("mongodb").ObjectId(value);
};
