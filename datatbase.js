const { MongoClient } = require("mongodb");
const assert = require("assert");
const { tr } = require("faker/lib/locales");
const { mongo } = require("mongoose");
const isProduction = process.env.NODE_ENV === "production";
const url = isProduction
  ? process.env.MONGO_URI_PROD
  : process.env.MONGO_URI_DEV;
let etf_db;
let etf_activity;
let mgoClient;

async function initDb() {
  try {
    mgoClient = new MongoClient(url, {
      useNewUrlParser: true,
      poolSize: 20,
    });
    await mgoClient.connect();
    await mgoClient.db("etf_db").command({ ping: 1 });

    let k = await mgoClient.db("etf_db").collection('ARKG').find({}).limit(1).toArray()
    console.log(k)
    console.log("Connected successfully to server");
    return mgoClient;
  } catch (err) {
    console.log(err.stack);
  }
}

function getDb() {
  assert.ok(
    mgoClient,
    "Db has not been initialized. Please called init first."
  );
  return mgoClient;
}

module.exports = {
  getDb,
  initDb,
};
