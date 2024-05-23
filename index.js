import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import bodyParser from "body-parser";
import { connectDB } from "./db/config.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT | 4000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", routes);

(async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
})();
