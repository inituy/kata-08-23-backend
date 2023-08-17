describe('getCampaigns', function () {
  let fn = require('../../data/get_campaigns')
    , findCampaignsSuccess = require('../doubles/find_campaigns_success')

  it('Finds campaigns', function (done) {
    let payload = {
      login: { address: Math.random().toString() },
      stuff: Math.random().toString()
    };
    let deps = { findCampaigns: findCampaignsSuccess(payload.address) };
    fn(deps)(payload).then(function (response) {
      expect(response).toBe(payload);
      expect(deps.findCampaigns.params).toEqual({ address: payload.login.address });
      expect(payload.campaigns).toEqual(deps.findCampaigns.result);
      done();
    });
  });
});
