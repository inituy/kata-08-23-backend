describe('getCampaigns', function () {
  let fn = require('../../queries/find_campaigns.js')
    , db
    , campaigns
    , address = Math.random().toString()

  beforeEach(function () {
    return require('../support/empty_database.js')()
      .then(require('../../connection.js').open)
      .then(function (_) { db = _; })
      .then (function () {
        campaigns = [
          { name: Math.random().toString(),
            address: address,
            image: Math.random().toString(),
            description: Math.random().toString() },
          { name: Math.random().toString(),
            address: Math.random().toString(),
            image: Math.random().toString(),
            description: Math.random().toString() },
          { name: Math.random().toString(),
            address: address,
            image: Math.random().toString(),
            description: Math.random().toString() },
        ];
        return db.collection('campaigns').insertMany(campaigns);
      });
  });

  it('get campaigns for given address', function (done) {
    let payload = { address: address };
    fn(db)(payload).then((results) => {
      expect(results).toEqual([
        { _id: campaigns[0]._id,
          name: campaigns[0].name,
          address: campaigns[0].address,
          image: campaigns[0].image,
          description: campaigns[0].description },
        { _id: campaigns[2]._id,
          name: campaigns[2].name,
          address: campaigns[2].address,
          image: campaigns[2].image,
          description: campaigns[2].description },
      ]);
      done();
    });
  });
});
