import express, { Application, Request, Response } from "express";
import connectDB from "./config/mongodb";
const app: Application = express();
const PORT: Number = 5000;

const bootServer = () => {
  app.get("/", (req: Request, res: Response) => {
    res.send("hello");
  });

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
