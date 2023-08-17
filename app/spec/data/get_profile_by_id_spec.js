describe("getProfileById", function () {
  var fn = require("../../data/get_profile_by_id")
    , findProfileByIdSuccess = require("../support/doubles/find_profile_by_address/success")
    , findProfileByIdNull = require("../doubles/query_null")

  it("finds profile by id", function (done) {
    var payload = {
      businessId: Math.random().toString(),
      campaignId: Math.random().toString()
    };
    var deps = {
      findProfileById: findProfileByIdSuccess({ address: payload.businessId })
    };
    fn(deps)(payload).then(function (response) {
      expect(response).toBe(payload);
      expect(deps.findProfileById.params)
        .toEqual({ address: payload.businessId });
      expect(response.profile).toEqual(deps.findProfileById.result);
      done();
    });
  });

  it("No profile for given ID, fails", function (done) {
    var payload = {
      businessId: Math.random().toString(),
      campaignId: Math.random().toString()
    };
    var deps = {
      findProfileById: findProfileByIdNull({ address: payload.businessId })
    };
    fn(deps)(payload).catch(function (response) {
      expect(deps.findProfileById.params)
        .toEqual({ address: payload.businessId });
      expect(response).toEqual({ profile: "NOT_FOUND" });
      done();
    });
  });
});
