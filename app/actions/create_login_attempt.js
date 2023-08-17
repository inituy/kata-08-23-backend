module.exports = function createLoginAttempt(deps) {
  return function (payload) {
    return Promise.resolve(payload)
      .then(require('../data/generate_login_attempt')(deps))
      .then(require('../presentation/present_login_attempt_id'))
  }
};
