describe('/get_entries', function () {
  var request = require('./support/request.js')

  var port = 25777
    , server
    , user
    , db
    , entries;

  beforeAll(function (done) {
    require('../http/initialize_server.js')()
      .then(function (_) { server = _; })
      .then(function () { return server.listen(port); })
      .then(done)
  });

  beforeEach(function (done) {
    require('../mongo/connection.js').open()
      .then(function (_) { db = _;})
      .then(function () { return db.dropDatabase(); })
      .then(function () {
        user = { email: Math.random() }
        return db.collection('users').insertOne(user);
      })
      .then(function () {
        entries = [
          { stuff: Math.random(), user_id: user._id },
          { stuff: Math.random() },
          { stuff: Math.random(), user_id: user._id },
        ]
        return db.collection('entries').insertMany(entries)
      })
      .then(done)
  });

  afterAll(function () {
    server.close();
  });

  it('missing user_id', function (done) {
    var payload = { stuff: Math.random() }
    request({
      port: port,
      path: "/get_entries",
      body: JSON.stringify(payload)
    })
    .then(function (response) {
      expect(response.statusCode).toBe(400);
      expect(JSON.parse(response.body)).toEqual({ user_id: 'MISSING' });
      done();
    });
  });

  it('user not found', function (done) {
    var payload = { user_id: Math.random() }
    request({
      port: port,
      path: "/get_entries",
      body: JSON.stringify(payload)
    })
    .then(function (response) {
      expect(response.statusCode).toBe(400);
      expect(JSON.parse(response.body)).toEqual({ user: 'NOT_FOUND' });
      done();
    });
  });

  it('get entries', function (done) {
    var payload = { user_id: user._id }
    request({
      port: port,
      path: "/get_entries",
      body: JSON.stringify(payload)
    })
    .then(function (response) {
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body)).toEqual({
        entries: [
          { _id: entries[0]._id.toString(),
            stuff: entries[0].stuff,
            user_id: user._id.toString() },
          { _id: entries[2]._id.toString(),
            stuff: entries[2].stuff,
            user_id: user._id.toString() },
        ]
      });
      done();
    });
  });
});
