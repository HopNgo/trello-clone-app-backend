import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT: Number = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log("Sever is running on PORT = " + PORT);
});
