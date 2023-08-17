const { ObjectId } = require('mongodb');
module.exports = function mongoObjectId(value) {
  return new ObjectId(value)
};
