module.exports = function findTimers(db) {
  return function(data) {
    return db.collection('users')
      .findOne({ _id: require('../object_id.js')(data.user_id) });
  };
};
