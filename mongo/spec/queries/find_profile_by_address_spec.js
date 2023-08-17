describe('findProfileByAddress', () => {
  var fn = require('../../queries/find_profile_by_address.js')
    , profile
    , db;

  beforeEach(() => {
    return require('../support/empty_database.js')()
      .then(require('../../connection.js').open)
      .then((_) => { db = _; })
      .then(() => {
        profile = {};
        return db.collection('businessProfiles').insertOne(profile);
      });
  });

  it('finds profile', (done) => {
    var data = { address: profile.address };
    fn(db)(data).then((result) => {
      expect(result).toEqual(profile)
      done();
    });
  });

  it('does not find profile', (done) => {
    var data = { address: Math.random().toString() };
    fn(db)(data).then((result) => {
      expect(result).toBeNull();
      done();
    });
  });
});