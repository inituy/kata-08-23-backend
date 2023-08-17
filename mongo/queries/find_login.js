module.exports = function getCampaigns(db) {
  return function (payload) {
    return db.collection('logins')
      .findOne({ _id: require('../object_id')(payload.loginId) })
  };
};
