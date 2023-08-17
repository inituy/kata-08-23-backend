describe("Create Business Login", () => {
  var fn = require("../../actions/create_business_login.js");
  var findLoginAttemptSuccess = require("../support/doubles/find_login_attempt/success.js"),
    findLoginAttemptFailure = require("../support/doubles/find_login_attempt/failure.js"),
    verifySignatureSuccess = require("../../../spec/support/verify_signature/success.js"),
    verifySignatureFailure = require("../../../spec/support/verify_signature/failure.js"),
    saveBusinessLoginSuccess = require("../support/doubles/save_business_login/success.js");

  it("creates business login", (done) => {
    var deps = {
      findLoginAttempt: findLoginAttemptSuccess(),
      verifySignature: verifySignatureSuccess(),
      saveBusinessLogin: saveBusinessLoginSuccess(),
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
      expect(deps.saveBusinessLogin.params).toEqual({
        address: payload.address,
      });
      expect(response).toEqual({
        login: deps.saveBusinessLogin.result,
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
      expect(response).toEqual({ loginAttempt: "NOT_FOUND" });
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
      expect(response).toEqual({ signature: "INVALID" });
      done();
    });
  });
});
