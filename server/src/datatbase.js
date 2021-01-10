const { MongoClient } = require('mongodb');
const assert = require('assert');
const { tr } = require('faker/lib/locales');
const isProduction = process.env.NODE_ENV === 'production';
const url = isProduction ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;
let etf_db;
let etf_activity;
let mgoClient;

async function initDb() {
  try {
    const client = new MongoClient(url, { useNewUrlParser: true, poolSize: 20 });
    mgoClient = await client.connect();
    // etf_db = mgoClient.db('etf_db');
    // etf_activity = mgoClient.db('etf_activity');
  } catch (err) {
    console.log(err.stack);
  } 
}

function getDb() {
  assert.ok(mgoClient, 'Db has not been initialized. Please called init first.');
  return mgoClient;
}

module.exports = {
  getDb,
  initDb,
};

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://<username>:<password>@clusterboya.prmmd.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
