module.exports = function () {
  const stub = function (params) {
    stub.paramsUsed = params;
    return true;
  };
  return stub;
};
