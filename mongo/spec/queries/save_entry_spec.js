describe('saveEntry', function () {
  var fn = require('../../queries/save_entry.js')
    , db;

  beforeEach(function () {
    jasmine.clock().install();
    return require('../support/empty_database.js')()
      .then(require('../../connection.js').open)
      .then(function (_) { db = _; })
  });

  afterAll(function () {
    jasmine.clock().uninstall();
  });

  it('saves entry', function (done) {
    var entry_time = new Date();
    jasmine.clock().mockDate(entry_time);
    var data = { user_id: Math.random(), };
    fn(db)(data).then(function () {
      return db.collection('entries').find().toArray()
        .then(function (entries) {
          console.log('entries', entries);
          done();
        });
    });
  });
});
