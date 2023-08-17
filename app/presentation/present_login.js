module.exports = function presentLogin(payload) {
  return Promise.resolve({ login: payload.login });
};
