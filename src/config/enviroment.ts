import dotenv from "dotenv";
dotenv.config();

declare const process: {
  env: {
    DATABASE_URL: string;
    DATABASE_NAME: string;
    HOST_NAME: string;
    CLOUNDINARY_CLOUD_NAME: string;
    CLOUNDINARY_API_KEY: string;
    CLOUNDINARY_API_SECRET: string;
  };
};

const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_NAME: process.env.DATABASE_NAME,
  HOST_NAME: process.env.HOST_NAME,
  CLOUNDINARY_CLOUD_NAME: process.env.CLOUNDINARY_CLOUD_NAME,
  CLOUNDINARY_API_KEY: process.env.CLOUNDINARY_API_KEY,
  CLOUNDINARY_API_SECRET: process.env.CLOUNDINARY_API_SECRET,
};

export default env;
