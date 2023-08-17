module.exports = function findLoginAttempt(deps) {
  return function (payload) {
    return deps
      .findLoginAttempt({ loginAttemptId: payload.loginAttemptId })
      .then((loginAttempt) => {
        if (!loginAttempt) return Promise.reject({ loginAttempt: "NOT_FOUND" });
        payload.loginAttempt = loginAttempt;
        return payload;
      })
  };
};
