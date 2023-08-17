module.exports = function () {
  const stub = function (params) {
    stub.paramsUsed = params;
    return Promise.resolve(false);
  };
  return stub;
};