describe("presentProfile", function () {
  var fn = require("../../presentation/present_profile");

  it("presents profile", function (done) {
    var payload = { profile: { _id: Math.random().toString() } };
    fn(payload).then(function (response) {
      expect(response).toEqual({ profile: payload.profile });
      done();
    });
  });
});
