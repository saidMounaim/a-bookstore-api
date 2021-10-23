import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/", (req, res) => {
  res.status(201).json({ success: true, message: "Welcome ;)" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on ${PORT} PORT`));
