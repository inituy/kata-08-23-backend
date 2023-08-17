describe('findLoginAttempt', () => {
  var fn = require('../../queries/find_login_attempt.js')
    , loginAttempt
    , db;

  beforeEach(() => {
    return require('../support/empty_database.js')()
      .then(require('../../connection.js').open)
      .then((_) => { db = _; })
      .then(() => {
        loginAttempt = {};
        return db.collection('loginAttempts').insertOne(loginAttempt);
      });
  });

  it('finds loginAttempt', (done) => {
    var data = { _id: loginAttempt._id };
    fn(db)(data).then((result) => {
      expect(result).toEqual(loginAttempt)
      done();
    });
  });

  it('does not find loginAttempt', (done) => {
    var data = { _id: Math.random() };
    fn(db)(data).then((result) => {
      expect(result).toEqual(null)
      done();
    });
  });
});