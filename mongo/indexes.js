module.exports = function createIndexes(db) {
  return Promise.all([
    db.collection('companies').createIndex({ linkedinId: 1 }),
    db.collection('companies').createIndex({ domain: 1 }),
  ]);
};
