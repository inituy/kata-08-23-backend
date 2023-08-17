module.exports = function saveBusinessLogin(db) {
  return function (data) {
    return db.collection("businessLogins").insertOne({
      address: data.address,
    })
    .then(function (result) {
      return {
        address: data.address,
        _id: result.insertedId,
      };
    });
  };
};
