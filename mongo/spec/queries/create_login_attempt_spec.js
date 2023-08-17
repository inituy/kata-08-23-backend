describe('createLoginAttempt', function () {
  let fn = require('../../queries/create_login_attempt.js')
    , db;

  beforeEach(function () {
    return require('../support/empty_database.js')()
      .then(require('../../connection.js').open)
      .then(function (_) { db = _; })
  });

  it('creates login attempt', function (done) {
    fn(db).then((createdAttempt) => {
      const query = db.collection('loginAttempts').find().toArray();
      return Promise.all([ createdAttempt, query ])
        .then((responses) => {
          let [ createdAttempt, loginAttempts ] = responses;
          expect(loginAttempts[0]._id).toEqual(createdAttempt.insertedId);
          done();
        });
    });
  });
});
