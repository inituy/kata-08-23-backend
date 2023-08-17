module.exports = function getCampaigns(db) {
  return function (payload) {
    return db.collection('campaigns').find({ address: payload.address }).toArray();
  };
};
