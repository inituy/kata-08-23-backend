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
    findBusinessProfile: require('../mongo/queries/find_profile_by_address.js')(db),
    findProfileByAddress: require('../mongo/queries/find_profile_by_address.js')(db),
    createProfile: require('../mongo/queries/create_business_profile.js')(db),
    findProfileById: require('../mongo/queries/find_profile_by_address')(db),
    findLoginById: require('../mongo/queries/find_login_by_id.js')(db),
    findLogin: require('../mongo/queries/find_login')(db),
    findCampaigns: require('../mongo/queries/find_campaigns')(db),
    findCampaignById: require('../mongo/queries/find_campaign_by_id')(db)
  };

  Object.assign(deps, depOverrides);

  var actions = {
    '/create_business_login': require('../app/actions/create_business_login')(deps),
    '/create_login_attempt':  require('../app/actions/create_login_attempt')(deps),
    '/get_business_profile':  require('../app/actions/get_business_profile')(deps),
    '/get_campaigns':         require('../app/actions/get_campaigns')(deps),
    '/get_campaign':         require('../app/actions/get_campaign')(deps)
  };

  return actions;
};
