import { MongoClient } from "mongodb";

// ----------------- Types -----------------
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri: string = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/careerDB";
const options = {}; // You can add MongoClientOptions if needed

// Use a global variable to preserve MongoClient across hot reloads in development
const clientPromise: Promise<MongoClient> = global._mongoClientPromise ?? new MongoClient(uri, options).connect();

if (!global._mongoClientPromise) {
  global._mongoClientPromise = clientPromise;
}

export default clientPromise;
