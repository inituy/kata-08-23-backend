const notFound = () => Promise.reject({ login: 'NOT_FOUND' });
module.exports = function getLogin(deps) {
  return function (payload) {
    return deps.findLogin({ loginId: payload.loginId })
      .then(function(login) {
        if (!login) return notFound();
        payload.login = login;
        return payload;
      });
  };
};
