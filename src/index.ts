require("dotenv").config();
require("./database/mongoose");
import express from "express";
import cors from "cors";
import appRoutes from "./routes";
import { APP } from "./constants";
import { appNotification } from "./utils/appNotification";

const app = express();
const port = APP.PORT;

app.use(express.json());
app.use(cors());

// configure app notification
appNotification(app);

// configure app routes
appRoutes(app);

app.get("/api/server-test", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
