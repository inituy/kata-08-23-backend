module.exports = function () {
  var double = function findLoginNull(params) {
    double.params = params;
    double.result = null;
    return new Promise(function (ok, reject) {
      var fn = function () { ok(double.result); };
      setTimeout(fn, 10);
    });
  };
  return double;
};
