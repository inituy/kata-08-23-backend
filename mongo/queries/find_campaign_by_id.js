module.exports = function findCampaignById(db) {
  return function (payload) {
    let query = { $and: [
      { address: payload.address },
      { _id: require('../object_id')(payload.campaignId) }
    ]}
    return db.collection('campaigns').findOne(query);
  };
};
