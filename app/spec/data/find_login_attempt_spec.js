describe("findLoginAttempt", () => {
  var fn = require("../../data/find_login_attempt.js");
  var findLoginAttemptSuccess = require("../support/doubles/find_login_attempt/success.js"),
    findLoginAttemptFailure = require("../support/doubles/find_login_attempt/failure.js"),
    verifySignatureSuccess = require("../../../spec/support/verify_signature/success.js"),
    verifySignatureFailure = require("../../../spec/support/verify_signature/failure.js");

  it("finds login attempt", (done) => {
    var deps = {
      findLoginAttempt: findLoginAttemptSuccess(),
      verifySignature: verifySignatureSuccess(),
    };
    var payload = {
      loginAttemptId: Math.random(),
      address: Math.random().toString(),
      signature: Math.random().toString(),
    };
    fn(deps)(payload).then((response) => {
      expect(deps.findLoginAttempt.params).toEqual({
        loginAttemptId: payload.loginAttemptId,
      });
      expect(response).toEqual({
        loginAttemptId: payload.loginAttemptId,
        address: payload.address,
        signature: payload.signature,
        loginAttempt: deps.findLoginAttempt.result,
      });
      done();
    });
  });

  it("does not verify signature", (done) => {
    var deps = {
      findLoginAttempt: findLoginAttemptSuccess(),
      verifySignature: verifySignatureFailure(),
    };
    var payload = {
      loginAttemptId: Math.random(),
      address: Math.random().toString(),
      signature: Math.random().toString(),
    };
    fn(deps)(payload).catch((response) => {
      expect(deps.findLoginAttempt.params).toEqual({
        loginAttemptId: payload.loginAttemptId,
      });
      expect(response).toEqual({
        signature: "INVALID",
      });
      done();
    });
  });

  it("does not find login attempt", (done) => {
    var deps = {
      findLoginAttempt: findLoginAttemptFailure(),
    };
    var payload = {
      loginAttemptId: Math.random(),
      address: Math.random().toString(),
      signature: Math.random().toString(),
    };
    fn(deps)(payload).catch((response) => {
      expect(deps.findLoginAttempt.params).toEqual({
        loginAttemptId: payload.loginAttemptId,
      });
      expect(response).toEqual({
        loginAttempt: "NOT_FOUND",
      });
      done();
    });
  });
});
