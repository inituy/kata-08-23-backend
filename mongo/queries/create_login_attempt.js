module.exports = function createLoginAttempt(db) {
  return function () {
    return db.collection('loginAttempts')
      .insertOne({})
      .then(function (insertedLoginAttempt) {
        return insertedLoginAttempt;
      });
  }
};
