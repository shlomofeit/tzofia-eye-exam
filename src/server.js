import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { getDb } from "./db/db.js";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);

app.use((req, res, next) => {
  console.log(`${req.method} | ${req.url}`);
  next();
});

await getDb();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
