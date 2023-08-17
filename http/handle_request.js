var URLSearchParams = require('url').URLSearchParams;

module.exports = function handleRequest(actions) {
  function log(a) {
    if (!process.env.SHOW_LOGS) return;
    console.log(new Date(), a);
  }

  return function (req, res) {
    var path
      , queryString
      , action
      , payload;

    log(req.url);

    Promise.resolve()
      // Parse URL
      .then(function () {
        var parts = req.url.split('?');
        path = parts[0];
        if (parts[1]) queryString = new URLSearchParams(parts[1]);
      })

      // Find usecase
      .then(function () {
        action = actions[path];
        if (!action) {
          res.writeHead(404, { 'content-type': 'application/json' });
          res.end('{}');
          return Promise.reject(req.url + ' not found.');
        }
      })
      //.catch(console.log)

      // Read body
      .then(function () {
        return new Promise(function (resolve) {
          req.body = '';
          req.on('data', function (data) {
            req.body += data.toString();
          });
          req.on('end', function () {
            try { payload = JSON.parse(req.body); }
            catch (e) { payload = {}; }
            resolve();
          });
        });
      })

      // Add HTTP information to payload
      .then(function () {
        Object.assign(payload, { _httpInfo: { queryString: queryString } })
      })

      // Execute action
      .then(function () {
        log(JSON.stringify(payload));
        return action(payload)
          .then(function (response) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(response));
          })
          .catch(function (errors) {
            log(errors);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(errors));
          });
      })

      .catch(function (error) {
        log(error);
      });
  }
};
