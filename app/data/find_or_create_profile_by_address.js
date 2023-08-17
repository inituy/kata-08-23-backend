module.exports = function findOrCreateProfileByAddress(deps) {
  return function (payload) {
    return deps.findProfileByAddress({ address: payload.login.address })
      .then((profile) => {
        if (!profile) {
          return deps.createProfile({ address: payload.login.address })
            .then((newProfile) => {
              payload.profile = newProfile;
              return payload;
            });
        }
        payload.profile = profile;
        return payload;
      });
  };
};
