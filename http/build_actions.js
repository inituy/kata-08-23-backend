module.exports = async function buildActions(depOverrides, envOverrides) {
  depOverrides = depOverrides || {};
  envOverrides = envOverrides || {};

  var env = {
    MONGO_USER: process.env.MONGO_USER,
    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_NAME: process.env.MONGO_NAME,
    MONGO_PASS: process.env.MONGO_PASS,
  };

  Object.assign(env, envOverrides);

  var db = await require('../mongo/connection.js').open({
    user: env.MONGO_USER,
    pass: encodeURIComponent(env.MONGO_PASS),
    host: env.MONGO_HOST,
    name: env.MONGO_NAME,
  });

  var deps = {
    findLoginAttempt: require('../mongo/queries/find_login_attempt.js')(db),
    saveBusinessLogin: require('../mongo/queries/save_business_login.js')(db),
    verifySignature: require('../utils/verify_signature'),
    createLoginAttempt: require('../mongo/queries/create_login_attempt')(db),
  };

  Object.assign(deps, depOverrides);

  var actions = {
    '/create_business_login': require('../app/actions/create_business_login')(deps),
    '/create_login_attempt':  require('../app/actions/create_login_attempt')(deps),
  };

  return actions;
};
