import dotenv from "dotenv";
dotenv.config();

declare const process: {
  env: {
    DATABASE_URL: string;
    DATABASE_NAME: string;
  };
};

const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_NAME: process.env.DATABASE_NAME,
};

export default env;
