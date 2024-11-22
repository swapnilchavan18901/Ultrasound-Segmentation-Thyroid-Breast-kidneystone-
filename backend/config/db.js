const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file


// Connection URL
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME;

let db;

const connectToDatabase = async () => {
  if (db) return db;

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("Connected successfully to MongoDB server");
    db = client.db(dbName);
    return db;
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    throw err;
  }
};

module.exports = connectToDatabase;