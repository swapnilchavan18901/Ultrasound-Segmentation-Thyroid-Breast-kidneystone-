/* Export the model creation functions for the migration script */

const { createUserCollection } = require('./user_model');

const createCollections = async (db) => {
    await createUserCollection(db);

};

module.exports = { createCollections };