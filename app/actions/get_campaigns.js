module.exports = function getCampaigns(deps) {
  return function (payload) {
    return Promise.resolve(payload)
      .then(require('../data/get_login')(deps))
      .then(require('../data/get_campaigns')(deps))
      .then(require('../presentation/present_campaigns'))
  }
};
