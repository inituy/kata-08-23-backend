describe('findEntries', function () {
  var fn = require('../../queries/find_entries.js')
    , entries
    , db;

  beforeEach(function () {
    return require('../support/empty_database.js')()
      .then(require('../../connection.js').open)
      .then(function (_) { db = _; })
      .then(function () {
        user = { email: Math.random() };
        return db.collection('users').insertOne(user);
      })
      .then(function () {
        entries = [
          { stuff: Math.random(), user_id: user._id },
          { stuff: Math.random(), user_id: Math.random() },
          { stuff: Math.random(), user_id: user._id },
        ]
        return db.collection('entries').insertMany(entries);
      });
  });

  it('finds entries', function (done) {
    var data = { user_id: user._id, token: Math.random() };
    fn(db)(data).then(function (result) {
      expect(result).toEqual([
        { _id: entries[0]._id, stuff: entries[0].stuff, user_id: user._id },
        { _id: entries[2]._id, stuff: entries[2].stuff, user_id: user._id },
      ])
      done();
    });
  });
});
