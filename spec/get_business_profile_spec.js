describe('/get_business_profile', function () {
  var request = require('./support/request.js');
  var objectId = require('../mongo/object_id.js');
  var port = 25797
    , server
    , db
    , login

  beforeAll(function (done) {
    require('../http/initialize_server.js')()
      .then(function (_) { server = _; })
      .then(function () { return server.listen(port); })
      .then(done)
  });

  beforeEach((done) => {
    require('../mongo/connection').open()
      .then((_) => { db = _; })
      .then(() => { return db.dropDatabase() })
      .then(() => { 
        login = {
          address: Math.random().toString(),
        };
        return db.collection('businessLogins').insertOne(login);
      })
      .then(done);
  });

  afterAll(function () {
    server.close();
  });

  it('gets business profile', function (done) {
    var payload = { loginId: login._id.toString() };
    request({
      port: port,
      path: "/get_business_profile",
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        expect(response.statusCode).toEqual(200);
        done();
      });
  });

  it('login not found', function (done) {
    var payload = { loginId: objectId() };
    request({
      port: port,
      path: "/get_business_profile",
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        expect(response.statusCode).toEqual(400);
        expect(JSON.parse(response.body)).toEqual({ login: "NOT_FOUND" });
        done();
      });
    });
});