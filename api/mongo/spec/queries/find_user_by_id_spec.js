describe('findUserById', function () {
  var fn = require('../../queries/find_user_by_id.js')
    , user
    , db;

  beforeEach(function () {
    return require('../support/empty_database.js')()
      .then(require('../../connection.js').open)
      .then(function (_) { db = _; })
      .then(function () {
        user = { email: Math.random() };
        return db.collection('users').insertOne(user);
      });
  });

  it('finds user', function (done) {
    var data = { user_id: user._id, token: Math.random() };
    fn(db)(data).then(function (result) {
      expect(result).toEqual({ _id: user._id, email: user.email })
      done();
    });
  });
});
