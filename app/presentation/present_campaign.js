module.exports = function presentCampaign(payload) {
  return Promise.resolve({ campaign: payload.campaign });
};
