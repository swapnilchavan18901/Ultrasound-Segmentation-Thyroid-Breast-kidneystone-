const connectDB = require('../config/db');
const { ObjectId } = require('mongodb');

const createResultCollection = async (db) => {
    const collections = await db.listCollections({ name: 'result' }).toArray();
    if (collections.length === 0) {
        const collection = await db.createCollection('result');
    }
};

const getResultCollection = async () => {
    const db = await connectDB();
    return db.collection('result');
};

module.exports = { createResultCollection, getResultCollection, ObjectId };