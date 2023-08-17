module.exports = function presentCampaigns(payload) {
  return Promise.resolve({ campaigns: payload.campaigns });
};
