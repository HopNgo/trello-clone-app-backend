import express, { Application } from "express";
import connectDB from "./config/mongodb";
import { apiV1 } from "./routes/v1";
const PORT: Number = 5000;

const bootServer = () => {
  const app: Application = express();
  app.use(express.json());

  //Use APIs
  app.use("/v1", apiV1);

  //app listen
  app.listen(PORT, () => {
    console.log("Sever is running on PORT = " + PORT);
  });
};

connectDB()
  .then(() => {
    console.log("connected successfully DB to server");
  })
  .then(() => {
    bootServer();
  })
  .catch((error) => {
    console.log(error);
  });
