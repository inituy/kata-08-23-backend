describe('presentCampaign', function () {
  let fn = require('../../presentation/present_campaign');

  it('presents campaigns', function (done) {
    let payload = {
      stuff: Math.random().toString(),
      campaign: Math.random().toString()
    };
    fn(payload).then(function (response) {
      expect(response).toEqual({ campaign: payload.campaign });
      done();
    });
  });
});
