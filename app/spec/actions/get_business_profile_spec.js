describe("getBusinessProfile", function () {
  var fn = require("../../actions/get_business_profile"),
    findLoginbyIdSuccess = require("../support/doubles/find_login_by_id/success.js"),
    findLoginbyIdFailure = require("../support/doubles/find_login_by_id/failure.js"),
    findProfileByAddressSuccess = require("../support/doubles/find_profile_by_address/success.js"),
    findProfileByAddressFailure = require("../support/doubles/find_profile_by_address/failure.js"),
    createProfileSuccess = require("../support/doubles/create_profile/success.js");

  it("gets business profile", function (done) {
    var payload = { loginId: Math.random().toString() };
    var deps = {
      findLoginById: findLoginbyIdSuccess(),
      findProfileByAddress: findProfileByAddressSuccess(),
      createProfile: createProfileSuccess(),
    };

    fn(deps)(payload).then(function (response) {
      expect(deps.findLoginById.params).toEqual({ loginId: payload.loginId });
      expect(deps.findLoginById.result).toEqual({
        _id: payload.loginId,
        address: deps.findLoginById.result.address,
      });
      expect(deps.findProfileByAddress.params).toEqual({
        address: deps.findLoginById.result.address,
      });
      expect(deps.findProfileByAddress.result).toEqual({
        _id: deps.findProfileByAddress.result._id,
        address: deps.findLoginById.result.address,
      });
      expect(response).toEqual({
        profile: {
          _id: deps.findProfileByAddress.result._id,
          address: deps.findProfileByAddress.result.address,
        },
      });
      done();
    });
  });

  it("gets business profile, creates profile", function (done) {
    var payload = { loginId: Math.random().toString() };
    var deps = {
      findLoginById: findLoginbyIdSuccess(),
      findProfileByAddress: findProfileByAddressFailure(),
      createProfile: createProfileSuccess(),
    };

    fn(deps)(payload).then(function (response) {
      expect(deps.findLoginById.params).toEqual({ loginId: payload.loginId });
      expect(deps.findProfileByAddress.params).toEqual({
        address: deps.findLoginById.result.address,
      });
      expect(deps.createProfile.params).toEqual({
        address: deps.findLoginById.result.address,
      })
      expect(response).toEqual({
        profile: {
          _id: deps.createProfile.result._id,
          address: deps.createProfile.result.address,
        },
      });
      done();
    });
  });

  it("fails to find login", function (done) {
    var payload = { loginId: Math.random().toString() };
    var deps = { findLoginById: findLoginbyIdFailure() };

    fn(deps)(payload).catch(function (error) {
      expect(error).toEqual({ login: 'NOT_FOUND' });
      done();
    });
  });
});
