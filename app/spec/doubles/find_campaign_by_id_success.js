module.exports = function () {
  var double = function findCampaignByIdSuccess(params) {
    double.params = params;
    double.result = { 
      _id: params.campaignId,
      name: Math.random().toString(),
      address: params.address,
      image: Math.random().toString(),
      description: Math.random().toString()
    };
    return new Promise(function (ok) {
      var fn = function () { ok(double.result); };
      setTimeout(fn, 10);
    });
  };
  return double;
};

