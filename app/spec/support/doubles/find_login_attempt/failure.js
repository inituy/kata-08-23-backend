module.exports = function () {
  var double = function findLoginAttemptFailure(params) {
    double.params = params;
    return new Promise(function (ok) {
      var fn = function () { ok(null); };
      setTimeout(fn, 10);
    });
  };
  return double;
}
