var connection = require('../../connection.js');

module.exports = function emptyDatabase() {
  return connection.open().then(function (db) {
    return db.dropDatabase();
  });
};
