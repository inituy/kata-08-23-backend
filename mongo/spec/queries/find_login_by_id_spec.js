describe('findLoginById', () => {
  var fn = require('../../queries/find_login_by_id.js')
    , login
    , db;

  beforeEach(() => {
    return require('../support/empty_database.js')()
      .then(require('../../connection.js').open)
      .then((_) => { db = _; })
      .then(() => {
        login = {};
        return db.collection('businessLogins').insertOne(login);
      });
  })

  it('finds login', (done) => {
    var data = { loginId: login._id };
    fn(db)(data).then((result) => {
      expect(result).toEqual(login)
      done();
    });
  });

  it('does not find login', (done) => {
    var data = { _id: Math.random() };
    fn(db)(data).then((result) => {
      expect(result).toEqual(null)
      done();
    });
  });
});