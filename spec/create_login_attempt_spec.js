describe('/create_login_attempt', function () {
  var request = require('./support/request.js');

  var port = 25797
    , server
    , db

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
  });

  afterAll(function () {
    server.close();
  });

  it('creates login attempt and returns id', function (done) {
    var payload = {};
    request({
      port: port,
      path: "/create_login_attempt",
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        let query = db.collection('loginAttempts').find().toArray();
        return Promise.all([ response, query ])
          .then(function (responses) {
            const [ httpResponse, mongoQuery ] = responses;
            expect(httpResponse.statusCode).toBe(200);
            expect(JSON.parse(httpResponse.body))
              .toEqual({ loginAttemptId: mongoQuery[0]._id.toString() });
            done();
          });
      });
  });
});
