describe('getLogin', function () {
  let fn = require('../../queries/find_login.js')
    , objectId = require('../../object_id')
    , db
    , logins
    , loginId = objectId();

  beforeEach(function () {
    return require('../support/empty_database.js')()
      .then(require('../../connection.js').open)
      .then(function (_) { db = _; })
      .then (function () {
        logins = [
          { _id: objectId(),
            address: Math.random().toString(),
            stuff: Math.random().toString() },
          { _id: loginId,
            address: Math.random().toString(),
            stuff: Math.random().toString() },
          { _id: objectId(),
            address: Math.random().toString(),
            stuff: Math.random().toString() },
        ];
        return db.collection('logins').insertMany(logins);
      });
  });

  it('get login for given login ID', function (done) {
    let payload = { loginId: loginId };
    fn(db)(payload).then((results) => {
      expect(results).toEqual({
        _id: logins[1]._id,
        address: logins[1].address,
        stuff: logins[1].stuff
      });
      done();
    });
  });
});
