require("dotenv").config();
require("./database/mongoose");
import express from "express";
import cors from "cors";
import appRoutes from "./routes";
import { APP } from "./constants";

const app = express();
const port = APP.PORT;

app.use(express.json());
app.use(cors());

appRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
