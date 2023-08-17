module.exports = function getCampaignById(deps) {
  return function (payload) {
    return deps.findCampaignById({
      address: payload.businessId,
      campaignId: payload.campaignId
    })
      .then(function(campaign) {
        if (!campaign) return Promise.reject({ campaign: 'NOT_FOUND' });
        payload.campaign = campaign;
        return payload;
      });
  };
};
