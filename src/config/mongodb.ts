import { MongoClient } from "mongodb";
import env from "./enviroment";

const listDatabases = async (client: MongoClient) => {
  const databases = await client.db().admin().listDatabases();
  console.log(databases);
};

const connectDB = async () => {
  const client: MongoClient = new MongoClient(env.DATABASE_URL);
  try {
    await client.connect();
    console.log("Connected successfully to server !!");
    await listDatabases(client);
  } finally {
    await client.close();
  }
};

export default connectDB;
