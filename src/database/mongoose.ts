import mongoose from "mongoose";
import { DATABASE } from "../constants";

if (!DATABASE.URI) {
  console.log(
    "<== Please provide a valid MONGODB_URI environment variable ==>"
  );
  process.exit(1);
}

mongoose.connect(DATABASE.URI, {});

const db = mongoose.connection;

db.on("error", (error) => {
  console.log(`<== connection error: ${error} ==>`);
  process.exit(1);
});

db.once("open", () => {
  console.log("Database Connected successfully");
});
