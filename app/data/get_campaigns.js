module.exports = function getCampaigns(deps) {
  return function (payload) {
    return deps.findCampaigns({ address: payload.login.address })
      .then(function(campaigns) {
        payload.campaigns = campaigns;
        return payload;
      });
  };
};
