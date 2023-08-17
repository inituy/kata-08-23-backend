module.exports = function presentProfile(payload) {
  return Promise.resolve({ profile: payload.profile });
};