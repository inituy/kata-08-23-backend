describe('/get_campaign', function () {
  var objectId = require('../mongo/object_id');
  var request = require('./support/request.js');

  var port = 25797
    , server
    , db
    , businessProfiles
    , campaigns
    , campaignId = objectId()
    , address = Math.random().toString()

  beforeAll(function (done) {
    require('../http/initialize_server.js')()
      .then(function (_) { server = _; })
      .then(function () { return server.listen(port); })
      .then(done)
  });

  beforeEach(function () {
    return require('../mongo/spec/support/empty_database.js')()
      .then(require('../mongo/connection.js').open)
      .then(function (database) { db = database; })
      .then(function () {
        businessProfiles = [
          { _id: objectId(),
            address: Math.random().toString(),
            stuff: Math.random().toString() },
          { _id: objectId(),
            address: address,
            stuff: Math.random().toString() },
        ];
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
        return Promise.all([
          db.collection('businessProfiles').insertMany(businessProfiles),
          db.collection('campaigns').insertMany(campaigns),
        ])
      });
  });

  afterAll(function () {
    server.close();
  });

  it('no profile for given id, fails', function (done) {
    var payload = {
      businessId: Math.random().toString(),
      campaignId: campaignId
    };
    request({
      port: port,
      path: "/get_campaign",
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body))
          .toEqual({ profile: 'NOT_FOUND' });
        done();
      });
  });

  it('no campaign for given id, fails', function (done) {
    var payload = {
      businessId: address,
      campaignId: objectId()
    };
    request({
      port: port,
      path: "/get_campaign",
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body))
          .toEqual({ campaign: 'NOT_FOUND' });
        done();
      });
  });

  it('returns campaign', function (done) {
    var payload = { businessId: address, campaignId: campaignId };
    request({
      port: port,
      path: "/get_campaign",
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual({
          campaign:
            { _id: campaignId.toString(),
              name: campaigns[1].name,
              address: address,
              description: campaigns[1].description,
              image: campaigns[1].image },
        });
        done();
      });
  });
});
