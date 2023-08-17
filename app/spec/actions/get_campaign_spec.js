describe('getCampaigns', function () {
  let fn = require('../../actions/get_campaign')
    , findProfileByIdNull = require('../doubles/query_null')
    , findProfileByIdSuccess = require('../support/doubles/find_profile_by_address/success')
    , findCampaignByIdNull = require('../doubles/query_null')
    , findCampaignByIdSuccess = require('../doubles/find_campaign_by_id_success')

  it('no profile for given id, fails', function (done) {
    let payload = {
      businessId: Math.random().toString(),
      campaignId: Math.random().toString()
    };
    let deps = {
      findProfileById: findProfileByIdNull(),
      findCampaignById: findCampaignByIdSuccess()
    };
    fn(deps)(payload).catch(function (response) {
      expect(deps.findProfileById.params)
        .toEqual({ address: payload.businessId });
      expect(response).toEqual({ profile: 'NOT_FOUND' });
      done();
    });
  });

  it('no campaign for given id, fails', function (done) {
    let payload = {
      businessId: Math.random().toString(),
      campaignId: Math.random().toString()
    };
    let deps = {
      findProfileById: findProfileByIdSuccess(),
      findCampaignById: findCampaignByIdNull()
    };
    fn(deps)(payload).catch(function (response) {
      expect(deps.findProfileById.params)
        .toEqual({ address: payload.businessId });
      expect(deps.findCampaignById.params).toEqual({
        address: payload.businessId,
        campaignId: payload.campaignId
      })
      expect(response).toEqual({ campaign: 'NOT_FOUND' });
      done();
    });
  });

  it('returns campaign', function (done) {
    let payload = {
      businessId: Math.random().toString(),
      campaignId: Math.random().toString()
    };
    let deps = {
      findProfileById: findProfileByIdSuccess(),
      findCampaignById: findCampaignByIdSuccess()
    };
    fn(deps)(payload).then(function (response) {
      expect(deps.findProfileById.params)
        .toEqual({ address: payload.businessId });
      expect(deps.findCampaignById.params).toEqual({
        address: payload.businessId,
        campaignId: payload.campaignId
      })
      expect(response).toEqual({ campaign: deps.findCampaignById.result });
      done();
    });
  });
});
