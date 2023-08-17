const nacl = require('tweetnacl');
const bs58 = require('bs58');

module.exports = function verifySignature(input) {
  verified = nacl.sign.detached.verify(
    new TextEncoder().encode(input.loginAttempt),
    bs58.decode(input.signature),
    bs58.decode(input.address),
  );
  console.log(verified);
  return verified;
}