module.exports = function createBusinessProfile(db) {
  return function (payload) {
    return db
      .collection("businessProfiles")
      .insertOne({ address: payload.address })
      .then(function (insertedProfile) {
        return insertedProfile;
      });
  };
};
