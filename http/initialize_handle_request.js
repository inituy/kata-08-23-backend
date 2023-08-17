module.exports = async function initializeHandleRequest(depOverrides, envOverrides) {
  var actions = await require('./build_actions')(depOverrides, envOverrides);
  var handleRequest = require('./handle_request.js')(actions);
  return handleRequest;
};
