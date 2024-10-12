require("dotenv").config();
require("./database/mongoose");
import express from "express";
import { APP } from "./constants";

const app = express();
const port = APP.PORT;

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
