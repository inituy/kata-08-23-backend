const nacl = require('tweetnacl');
const bs58 = require('bs58');
const { Keypair } = require('@solana/web3.js');
const ObjectId = require('../mongo/object_id.js');

describe('/create_business_login', () => {
  var request = require('./support/request.js')

  var port = 25777
    , server
    , db
    , loginAttempt;

  const firstKeypair = new Keypair();
  const secondKeypair = new Keypair();

  beforeAll((done) => {
    require('../http/initialize_server')()
      .then((_) => { server = _; })
      .then(() => { return server.listen(port) })
      .then(done);
  });

  beforeEach((done) => {
    require('../mongo/connection').open()
      .then((_) => { db = _; })
      .then(() => { return db.dropDatabase() })
      .then(() => { 
        loginAttempt = {};
        return db.collection('loginAttempts').insertOne(loginAttempt);
      })
      .then(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('creates businessLogin', (done) => {
    const message = new TextEncoder().encode(loginAttempt._id.toString());
    const signatureBytes = nacl.sign.detached(message, firstKeypair.secretKey)
    var payload = {
      address: firstKeypair.publicKey.toString(),
      loginAttemptId: loginAttempt._id.toString(),
      signature: bs58.encode(signatureBytes),
    };
    request({
      port: port,
      path: '/create_business_login',
      body: JSON.stringify(payload)
    })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        db.collection('businessLogins').findOne({ address: payload.address })
          .then((businessLogin) => {
            expect(JSON.parse(response.body)).toEqual({
              login: {
                address: payload.address,
                _id: businessLogin._id.toString(),
              }
            });
          })
          .then(done);
      })
  });

  it('returns 400 if loginAttemptId is not on database', (done) => {
    const message = new TextEncoder().encode(loginAttempt._id.toString());
    const signatureBytes = nacl.sign.detached(message, firstKeypair.secretKey)
    var payload = {
      address: firstKeypair.publicKey.toString(),
      loginAttemptId: ObjectId(Math.random()),
      signature: bs58.encode(signatureBytes),
    };
    request({
      port: port,
      path: '/create_business_login',
      body: JSON.stringify(payload)
    })
      .then((response) => {
        expect(response.statusCode).toEqual(400);
        expect(JSON.parse(response.body)).toEqual({ loginAttempt: 'NOT_FOUND' });
      })
      .then(done);
  });

  it('returns 400 if signature is not verified', (done) => {
    const message = new TextEncoder().encode(loginAttempt._id.toString());
    const signatureBytes = nacl.sign.detached(message, firstKeypair.secretKey)
    var payload = {
      address: secondKeypair.publicKey.toString(),
      loginAttemptId: loginAttempt._id.toString(),
      signature: bs58.encode(signatureBytes),
    };
    request({
      port: port,
      path: '/create_business_login',
      body: JSON.stringify(payload)
    })
      .then((response) => {
        expect(response.statusCode).toEqual(400);
        expect(JSON.parse(response.body)).toEqual({ signature: 'INVALID' });
      })
      .then(done);
  });
});