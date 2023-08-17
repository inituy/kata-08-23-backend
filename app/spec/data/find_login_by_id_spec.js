describe("findLoginById", function () {
  var fn = require("../../data/find_login_by_id"),
    findLoginByIdSuccess = require("../support/doubles/find_login_by_id/success.js"),
    findLoginByIdFail = require("../support/doubles/find_login_by_id/failure.js");

  it("finds login by id", function (done) {
    var payload = { loginId: Math.random().toString() };
    var deps = { findLoginById: findLoginByIdSuccess() };
    fn(deps)(payload).then(function (response) {
      expect(response.login).toEqual({
        _id: deps.findLoginById.result._id,
        address: deps.findLoginById.result.address,
      });
      done();
    });
  });

  it("rejects with NOT_FOUND when login is not found", function (done) {
    var payload = { loginId: Math.random().toString() };
    var deps = { findLoginById: findLoginByIdFail() };
    fn(deps)(payload).catch(function (error) {
      expect(error).toEqual({ login: "NOT_FOUND" });
      done();
    });
  });
});
