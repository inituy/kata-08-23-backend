describe("presentLogin", () => {
  var fn = require("../../presentation/present_login.js");

  it("presents login", (done) => {
    var payload = {
      loginAttemptId: Math.random(),
      address: Math.random().toString(),
      signature: Math.random().toString(),
      loginAttempt: {
        _id: Math.random(),
      },
      login: {
        _id: Math.random(),
        address: Math.random().toString(),
      },
    };
    fn(payload).then((response) => {
      expect(response).toEqual({
        login: {
          _id: payload.login._id,
          address: payload.login.address,
        },
      });
      done();
    });
  });
});
