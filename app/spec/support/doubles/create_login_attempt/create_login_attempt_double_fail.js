module.exports = function () {
  var double = function createLoginAttemptDoubleFail(params) {
    double.params = params;
    double.result = {
      type: 'invalid_request_error',
      message: `Invalid email address: ${params.email}`
    };
    return new Promise(function (ok, reject) {
      var fn = function () {reject(double.result); };
      setTimeout(fn, 10);
    });
  };
  return double;
};


