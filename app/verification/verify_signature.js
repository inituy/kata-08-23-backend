module.exports = function verifySignature(deps) {
  return function (payload) {
    return deps
      .verifySignature({
        address: payload.address,
        signature: payload.signature,
        loginAttempt: payload.loginAttempt._id,
      })
      .then((verification) => {
        if (!verification) return Promise.reject({ signature: "INVALID" });
        return payload;
      });
  };
};
