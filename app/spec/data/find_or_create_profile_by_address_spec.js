describe("findProfileByAddress", function () {
  var fn = require("../../data/find_or_create_profile_by_address"),
    findProfileByAddressSuccess = require("../support/doubles/find_profile_by_address/success.js"),
    findProfileByAddressFail = require("../support/doubles/find_profile_by_address/failure.js"),
    createProfileSuccess = require("../support/doubles/create_profile/success.js");

  it("finds profile by address", function (done) {
    var payload = {
      loginId: Math.random().toString(),
      login: { address: Math.random().toString() }
    };
    var deps = { findProfileByAddress: findProfileByAddressSuccess() };
    fn(deps)(payload).then(function (response) {
      expect(response).toEqual({
        loginId: payload.loginId,
        login: payload.login,
        profile: deps.findProfileByAddress.result,
      });
      done();
    });
  });

  it("does not find profile, creates one", function (done) {
    var payload = {
      loginId: Math.random().toString(),
      login: { address: Math.random().toString() }
    };
    var deps = {
      findProfileByAddress: findProfileByAddressFail(),
      createProfile: createProfileSuccess(),
    };
    fn(deps)(payload).then(function (response) {
      expect(response).toEqual({
        loginId: payload.loginId,
        login: payload.login,
        profile: deps.createProfile.result,
      });
      done();
    });
  });
});
