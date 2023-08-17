describe('getLogin', function () {
  let fn = require('../../data/get_login')
    , findLoginSuccess = require('../doubles/find_login_success')
    , findLoginNull = require('../doubles/query_null');

  it('No login for given ID, fails', function (done) {
    let payload = { loginId: Math.random().toString() };
    let deps = { findLogin: findLoginNull() };
    fn(deps)(payload).catch(function (response) {
      expect(deps.findLogin.params).toEqual({ loginId: payload.loginId })
      expect(response).toEqual({ login: 'NOT_FOUND' });
      done();
    });
  });

  it('Finds login', function (done) {
    let payload = { loginId: Math.random().toString() };
    let deps = { findLogin: findLoginSuccess() };
    fn(deps)(payload).then(function (response) {
      expect(response).toBe(payload);
      expect(deps.findLogin.params).toEqual({ loginId: payload.loginId })
      expect(payload.login).toEqual(deps.findLogin.result);
      done();
    });
  });
});
