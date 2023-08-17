module.exports = function presentLoginAttemptId(payload) {
  return Promise.resolve({ loginAttemptId: payload.loginAttemptId });
};
