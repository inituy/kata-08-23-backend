module.exports = function findLoginById(deps) {
  return function (payload) {
    return deps.findLoginById({ loginId: payload.loginId }).then(function (login) {
      if (!login) return Promise.reject({ login: "NOT_FOUND" });
      payload.login = login;
      return payload;
    });
  };
};
