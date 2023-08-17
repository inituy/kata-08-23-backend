describe('createLoginAttempt', function () {
  let fn = require('../../actions/create_login_attempt')
    , createLoginAttemptSuccess = require('../doubles/create_login_attempt_double_success');

  it('creates login attempt and returns id', function (done) {
    let payload = {};
    let deps = { createLoginAttempt: createLoginAttemptSuccess() };
    fn(deps)(payload).then(function (response) {
      expect(response)
        .toEqual({ loginAttemptId: deps.createLoginAttempt.result.insertedId });
      done();
    });
  });
});
