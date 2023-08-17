module.exports = function getCampaign(deps) {
  return function (payload) {
    return Promise.resolve(payload)
      .then(require('../data/get_profile_by_id')(deps))
      .then(require('../data/get_campaign_by_id')(deps))
      .then(require('../presentation/present_campaign'))
  }
};
