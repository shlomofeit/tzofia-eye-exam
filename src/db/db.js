import "dotenv/config";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

let db = null;
let connection = null;

async function connect() {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  console.log("Connected to mongoDB...");
  return db;
}

export async function getDb() {
  if (db) return db;
  if (!connection) connection = connect();
  return connection;
}
