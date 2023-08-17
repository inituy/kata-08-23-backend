fdescribe("verify_signature", () => {
  var fn = require("../../verification/verify_signature");
  var verifySignatureSuccess = require("../support/doubles/verify_signature/success")
    , verifySignatureFailure = require("../support/doubles/verify_signature/failure")
    , nacl = require("tweetnacl")
    , bs58 = require("bs58")
    , { Keypair } = require("@solana/web3.js")
    , firstKeypair = new Keypair()
    , secondKeypair = new Keypair();

  it("verifies signature", (done) => {
    const message = new TextEncoder().encode("message");
    const signatureBytes = nacl.sign.detached(message, firstKeypair.secretKey);
    var deps = {
      verifySignature: verifySignatureSuccess(),
    };
    var payload = {
      address: firstKeypair.publicKey.toString(),
      signature: bs58.encode(signatureBytes),
      loginAttempt: {
        _id: "loginAttemptId",
      },
    };

    fn(deps)(payload).then((response) => {
      expect(response).toEqual(payload);
      done();
    });
  });

  it("rejects invalid signature", (done) => {
    const message = new TextEncoder().encode("message");
    const signatureBytes = nacl.sign.detached(message, firstKeypair.secretKey);
    var deps = {
      verifySignature: verifySignatureFailure(),
    };
    var payload = {
      address: secondKeypair.publicKey.toString(),
      signature: bs58.encode(signatureBytes),
      loginAttempt: {
        _id: "loginAttemptId",
      },
    };

    fn(deps)(payload).catch((error) => {
      expect(error).toEqual({ signature: "INVALID" });
      done();
    });
  });
});
