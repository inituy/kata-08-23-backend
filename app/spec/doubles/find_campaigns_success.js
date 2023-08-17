module.exports = function () {
  var double = function findCampaignsSuccess(params) {
    double.params = params;
    double.result = [
      { name: Math.random().toString(),
        address: params.address,
        image: Math.random().toString(),
        description: Math.random().toString() },
      { name: Math.random().toString(),
        address: params.address,
        image: Math.random().toString(),
        description: Math.random().toString() },
    ];
    return new Promise(function (ok) {
      var fn = function () { ok(double.result); };
      setTimeout(fn, 10);
    });
  };
  return double;
};

