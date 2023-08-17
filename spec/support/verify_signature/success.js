module.exports = function () {
  const stub = function (params) {
    stub.paramsUsed = params;
    return Promise.resolve(true);
  };
  return stub;
};
