module.exports = async function initializeServer(depOverrides, envOverrides) {
  var http = require('http');
  var actions = await require('./build_actions')(depOverrides, envOverrides);
  var handleRequest = require('./handle_request.js')(actions);
  var server = http.createServer(handleRequest);
  return server;
};
