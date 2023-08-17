module.exports = function findLoginAttempt(db) {
  return function(data) {
    return db.collection('loginAttempts')
      .findOne({ _id: require('../object_id.js')(data.loginAttemptId ) })
  }
}