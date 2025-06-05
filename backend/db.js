const { MongoClient } = require('mongodb');
require('dotenv').config();

let db = null;

async function connectToMongoDB() {
    if (db) return db;
    
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();

    db = client.db();
    console.log("Connection established to MongoDB.🗡️");
    return db;
}

function getDB(){
    if(!db) throw new Error('Database not connected.');
    return db;
}

module.exports = {connectToMongoDB, getDB};