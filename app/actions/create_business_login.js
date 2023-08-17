module.exports = function createBusinessLogin(deps) {
  return function (payload) {
    return Promise.resolve(payload)
      .then(require('../data/find_login_attempt')(deps))
      .then(require('../verification/verify_signature')(deps))
      .then(require('../data/save_business_login')(deps))
      .then(require('../presentation/present_login'))
  }
};
