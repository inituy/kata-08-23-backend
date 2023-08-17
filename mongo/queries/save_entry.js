module.exports = function saveEntry(db) {
  return function (data) {
    var entry_time = new Date();
    return db.collection('entries').insertOne({
      user_id: data.user_id,
      entry_time: entry_time
    });
  };
};
