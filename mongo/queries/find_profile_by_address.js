module.exports = function findBusinessProfile(db) {
  return function (payload) {
    return db.collection('businessProfiles').findOne({ address: payload.address })
      .then(function (profile) {
        return profile;
      });
  };
};