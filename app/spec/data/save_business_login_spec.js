describe('Save Business Login', () => {
  var fn = require('../../data/save_business_login');
  var saveBusinessLoginSuccess = require('../support/doubles/save_business_login/success');

  it('should save the business login', () => {
    var deps = {
      saveBusinessLogin: saveBusinessLoginSuccess(),
    };
    var payload = {
      loginAttemptId: Math.random(),
      address: Math.random().toString(),
      signature: Math.random().toString(),
      loginAttempt: {
        _id: Math.random(),
      }
    };

    fn(deps)(payload).then((response) => {
      expect(deps.saveBusinessLogin.params).toEqual({
        address: payload.address,
      });
      expect(response).toEqual({
        loginAttemptId: payload.loginAttemptId,
        address: payload.address,
        signature: payload.signature,
        loginAttempt: payload.loginAttempt,
        login: deps.saveBusinessLogin.result,
      });
    });
  });
})