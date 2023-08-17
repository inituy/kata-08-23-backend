describe('saveBusinessLogin', () => {
  var fn = require('../../queries/save_business_login.js')
    , db;

  beforeEach(() => {
    return require('../support/empty_database.js')()
      .then(require('../../connection.js').open)
      .then((_) => { db = _; });
  });

  it('saves businessLogin', (done) => {
    var data = { address: Math.random() };
    fn(db)(data).then((result) => {
      expect(result).toEqual({ address: data.address, _id: result._id })
      done();
    });
  });
});