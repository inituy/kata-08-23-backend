describe('presentLoginAttemptId', function () {
  let fn = require('../../presentation/present_login_attempt_id');

  it('presents login attempt id', function (done) {
    let payload = {
      stuff: Math.random().toString(),
      loginAttemptId: Math.random().toString()
    };
    fn(payload).then(function (response) {
      expect(response).toEqual({ loginAttemptId: payload.loginAttemptId })
      done();
    });
  });
});
