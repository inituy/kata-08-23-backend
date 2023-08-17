module.exports = function () {
  var double = function findLoginSuccess(params) {
    double.params = params;
    double.result = {
      _id: Math.random().toString(),
      address: Math.random().toString(),
      stuff: Math.random().toString()
    };
    return new Promise(function (ok) {
      var fn = function () { ok(double.result); };
      setTimeout(fn, 10);
    });
  };
  return double;
};

