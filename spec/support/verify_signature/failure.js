module.exports = function () {
  const stub = function (params) {
    stub.paramsUsed = params;
    return false;
  };
  return stub;
};