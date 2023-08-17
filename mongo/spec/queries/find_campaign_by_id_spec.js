describe('getCampaigns', function () {
  let fn = require('../../queries/find_campaign_by_id')
    , objectId = require('../../object_id')
    , db
    , campaigns
    , address = Math.random().toString()
    , campaignId = objectId();

  beforeEach(function () {
    return require('../support/empty_database.js')()
      .then(require('../../connection.js').open)
      .then(function (_) { db = _; })
      .then (function () {
        campaigns = [
          { _id: objectId(),
            name: Math.random().toString(),
            address: Math.random().toString(),
            image: Math.random().toString(),
            description: Math.random().toString() },
          { _id: campaignId,
            name: Math.random().toString(),
            address: address,
            image: Math.random().toString(),
            description: Math.random().toString() },
          { _id: objectId(),
            name: Math.random().toString(),
            address: address,
            image: Math.random().toString(),
            description: Math.random().toString() },
        ];
        return db.collection('campaigns').insertMany(campaigns);
      });
  });

  it('get campaigns for given address', function (done) {
    let payload = { address: address, campaignId: campaignId };

    fn(db)(payload).then((results) => {
      expect(results).toEqual({
        _id: payload.campaignId,
        name: campaigns[1].name,
        address: payload.address,
        image: campaigns[1].image,
        description: campaigns[1].description
      });
      done();
    });
  });
});
