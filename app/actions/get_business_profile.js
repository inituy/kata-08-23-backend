module.exports = function getBusinessProfile(deps) {
  return function (payload) {
    return Promise.resolve(payload)
      .then(require("../data/find_login_by_id")(deps))
      .then(require("../data/find_or_create_profile_by_address")(deps))
      .then(require("../presentation/present_profile"));
  };
};
