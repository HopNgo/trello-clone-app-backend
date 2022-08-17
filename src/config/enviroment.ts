import dotenv from "dotenv";
dotenv.config();

declare const process: {
  env: {
    DATABASE_URL: string;
  };
};

const env = {
  DATABASE_URL: process.env.DATABASE_URL,
};

export default env;
