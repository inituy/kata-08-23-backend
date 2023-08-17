describe('presentCampaigns', function () {
  let fn = require('../../presentation/present_campaigns');

  it('presents campaigns', function (done) {
    let payload = {
      stuff: Math.random().toString(),
      campaigns: Math.random().toString()
    };
    fn(payload).then(function (response) {
      expect(response).toEqual({ campaigns: payload.campaigns });
      done();
    });
  });
});
