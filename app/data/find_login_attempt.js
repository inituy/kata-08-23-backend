module.exports = function findLoginAttempt(deps) {
  return function (payload) {
    return deps
      .findLoginAttempt({ loginAttemptId: payload.loginAttemptId })
      .then((loginAttempt) => {
        if (!loginAttempt) return Promise.reject({ loginAttempt: "NOT_FOUND" });
        var verified = deps.verifySignature({
          address: payload.address,
          signature: payload.signature,
          loginAttempt: loginAttempt._id,
        });
        if (!verified) return Promise.reject({ signature: "INVALID" });
        payload.loginAttempt = loginAttempt;
        return payload;
      })
  };
};
