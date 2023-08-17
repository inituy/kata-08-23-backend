module.exports = function () {
  var double = function createLoginAttemptDoubleSuccess(params) {
    double.params = params;
    double.result = { insertedId: Math.random().toString() };
    return new Promise(function (ok) {
      var fn = function () { ok(double.result); };
      setTimeout(fn, 10);
    });
  };
  return double;
};

