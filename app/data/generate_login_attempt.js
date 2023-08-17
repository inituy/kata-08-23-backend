module.exports = function generateLoginAttempt(deps) {
  return function (payload) {
    return deps.createLoginAttempt()
      .then(function(createdLoginAttempt) {
        payload.loginAttemptId = createdLoginAttempt.insertedId;
        return payload;
      });
  };
};
