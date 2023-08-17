module.exports = function getProfileById(deps) {
  return function (payload) {
    return deps.findProfileById({ address: payload.businessId })
      .then(function (profile) {
        if (!profile) return Promise.reject({ profile: "NOT_FOUND" });
        payload.profile = profile;
        return payload;
      });
  };
};
