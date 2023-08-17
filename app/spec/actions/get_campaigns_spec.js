describe('getCampaigns', function () {
  let fn = require('../../actions/get_campaigns')
    , findLoginNull = require('../doubles/query_null')
    , findLoginSuccess = require('../doubles/find_login_success')
    , findCampaignsSuccess = require('../doubles/find_campaigns_success')

  it('no login for given id, fails', function (done) {
    let payload = {
      loginId: Math.random().toString(),
      stuff: Math.random().toString()
    };
    let deps = {
      findLogin: findLoginNull(),
      findCampaigns: findCampaignsSuccess()
    };
    fn(deps)(payload).catch(function (response) {
      expect(deps.findLogin.params).toEqual({ loginId: payload.loginId });
      expect(response).toEqual({ login: 'NOT_FOUND' });
      done();
    });
  });

  it('returns campaigns', function (done) {
    let payload = {
      loginId: Math.random().toString(),
      stuff: Math.random().toString(),
    };
    let deps = {
      findLogin: findLoginSuccess(),
      findCampaigns: findCampaignsSuccess()
    };
    fn(deps)(payload).then(function (response) {
      expect(deps.findLogin.params).toEqual({ loginId: payload.loginId });
      expect(deps.findCampaigns.params)
        .toEqual({ address: deps.findLogin.result.address });
      expect(response).toEqual({ campaigns: deps.findCampaigns.result });
      done();
    });
  });
});
