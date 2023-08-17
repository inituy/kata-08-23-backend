describe('getCampaignById', function () {
  let fn = require('../../data/get_campaign_by_id')
    , findCampaignByIdSuccess = require('../doubles/find_campaign_by_id_success');

  it('finds campaign for given id', function (done) {
    let payload = {
      campaignId: Math.random().toString(),
      businessId: Math.random().toString()
    };
    let deps = {
      findCampaignById: findCampaignByIdSuccess({
        address: payload.businessId,
        campaignId: payload.campaignId
      })
    };
    fn(deps)(payload).then(function (response) {
      expect(response).toBe(payload);
      expect(deps.findCampaignById.params).toEqual({
        address: payload.businessId,
        campaignId: payload.campaignId
      });
      expect(response.campaign).toEqual(deps.findCampaignById.result);
      done();
    });
  });
});
