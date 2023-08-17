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
    findUserById: require('../mongo/queries/find_user_by_id.js')(db),
    findEntries:  require('../mongo/queries/find_entries.js')(db),
    saveEntry:    require('../mongo/queries/save_entry.js')(db)
  };

  Object.assign(deps, depOverrides);

  var actions = {
    '/get_entries':  require('../../app/actions/get_entries.js')(deps),
    '/create_entry': require('../../app/actions/create_entry.js')(deps),
  };

  return actions;
};
