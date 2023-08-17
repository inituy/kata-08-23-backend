module.exports = function findLoginById(db) {
  return function (payload) {
    return db.collection('businessLogins').findOne({ _id: require('../object_id')(payload.loginId) })
      .then(function (login) {
        return login;
      });
  };
};
