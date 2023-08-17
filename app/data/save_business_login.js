module.exports = function saveBusinessLogin(deps) {
  return function (payload) {
    return deps
      .saveBusinessLogin({ address: payload.address })
      .then(function (login) {
        payload.login = login;
        return payload;
      });
  };
};
