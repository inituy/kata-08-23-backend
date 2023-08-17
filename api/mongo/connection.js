var MongoClient = require('mongodb').MongoClient;

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

module.exports = {
  open: function (credentials) {
    credentials = credentials || {};

    var user = credentials.user
      , pass = credentials.pass
      , host = credentials.host
      , name = credentials.name || 'researchers-test';

    var url = !!host
      ? `mongodb+srv://${user}:${pass}@${host}/${name}?retryWrites=true&w=majority`
      : 'mongodb://localhost:27017';

    return Promise.resolve()
      .then(function () {
        return MongoClient.connect(url, options);
      })
      .then(function (newClient) {
        client = newClient;
        return client.db(name);
      })
      .catch(function (error) {
        console.log('MONGO CONNECTION ERROR', error);
      });
  },
  close: function (client) {
    if (client) {
      client.close();
      client = null;
    }
    return Promise.resolve();
  }
};
