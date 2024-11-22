const connectDB = require('../config/db');
const { ObjectId } = require('mongodb');

const createUserCollection = async (db) => {
    const collections = await db.listCollections({ name: 'users' }).toArray();
    if (collections.length === 0) {
        const collection = await db.createCollection('users');
        await collection.createIndex({ email: 1 }, { unique: true });
    }
};

const getUserCollection = async () => {
    const db = await connectDB();
    return db.collection('users');
};

module.exports = { createUserCollection, getUserCollection, ObjectId };