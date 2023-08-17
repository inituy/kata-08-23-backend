module.exports = function () {
  var double = function findLoginAttemptSuccess(params) {
    double.params = params;
    double.result = true;
    return new Promise(function (ok) {
      var fn = function () { ok(double.result); };
      setTimeout(fn, 10);
    });
  };
  return double;
};