describe('/get_campaigns', function () {
  var objectId = require('../mongo/object_id');
  var request = require('./support/request.js');

  var port = 25797
    , server
    , db
    , logins
    , campaigns
    , loginId = objectId()
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
        logins = [
          { _id: objectId(),
            address: Math.random().toString(),
            stuff: Math.random().toString() },
          { _id: loginId,
            address: address,
            stuff: Math.random().toString() },
        ];
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
        return Promise.all([
          db.collection('logins').insertMany(logins),
          db.collection('campaigns').insertMany(campaigns),
        ])
      });
  });

  afterAll(function () {
    server.close();
  });

  it('creates login attempt and returns id', function (done) {
    var payload = { loginId: loginId };
    request({
      port: port,
      path: "/get_campaigns",
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual({
          campaigns: [
            { _id: campaigns[0]._id.toString(),
              name: campaigns[0].name,
              address: logins[1].address,
              description: campaigns[0].description,
              image: campaigns[0].image },
            { _id: campaigns[2]._id.toString(),
              name: campaigns[2].name,
              address: logins[1].address,
              description: campaigns[2].description,
              image: campaigns[2].image },
          ]
        });
        done();
      });
  });
});
