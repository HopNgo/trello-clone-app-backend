import { MongoClient } from "mongodb";
import env from "./enviroment";

let dbInstance: any = null;

const connectDB = async () => {
  const client: MongoClient = new MongoClient(env.DATABASE_URL);

  await client.connect();
  dbInstance = client.db(env.DATABASE_NAME);
};

export const getDB = () => {
  if (!dbInstance) {
    throw new Error("Must connect to database first!!");
  }
  return dbInstance;
};

export default connectDB;
