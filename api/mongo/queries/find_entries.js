module.exports = function findEntries(db) {
  return function(data) {
    return db.collection('entries')
      .find({ user_id: require('../object_id.js')(data.user_id ) })
      .toArray()
  }
}
