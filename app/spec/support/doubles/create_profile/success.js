module.exports = function () {
  var double = function findLoginAttemptSuccess(params) {
    double.params = params;
    double.result = {
      _id: Math.random().toString(),
      address: params.address,
    };
    return new Promise(function (ok) {
      var fn = function () { ok(double.result); };
      setTimeout(fn, 10);
    });
  };
  return double;
};