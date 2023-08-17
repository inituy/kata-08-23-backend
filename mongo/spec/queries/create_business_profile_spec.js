describe('createBusinessProfile', () => {
  var fn = require('../../queries/create_business_profile.js')
    , db;

  beforeEach(() => {
    return require('../support/empty_database.js')()
      .then(require('../../connection.js').open)
      .then((_) => { db = _; })
  });

  it('creates business profile', (done) => {
    var data = { address: Math.random().toString() };
    fn(db)(data).then((createdProfile) => {
      const query = db.collection('businessProfiles').find().toArray();
      return Promise.all([ createdProfile, query ])
        .then((responses) => {
          let [ createdProfile, businessProfiles ] = responses;
          expect(businessProfiles[0]._id).toEqual(createdProfile.insertedId);
          done();
        });
    });
  });
});