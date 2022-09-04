import cors from "cors";
import express, { Application } from "express";
import connectDB from "./config/mongodb";
import { apiV1 } from "./routes/v1";
import bodyParser from "body-parser";
const PORT = process.env.PORT || 8080;

const bootServer = () => {
  const app: Application = express();

  app.use("/static", express.static(__dirname + "/public"));
  app.use(express.json());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

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
