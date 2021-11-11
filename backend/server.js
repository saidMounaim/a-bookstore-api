import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import fileUpload from "express-fileupload";
import path from "path";

import { notFound, errorHandler } from "./middlewares/ErrorMiddleware.js";

//ROUTES
import BookRoute from "./routes/BookRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import OrderRoute from "./routes/OrderRoute.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(fileUpload());

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/api/", (req, res) => {
  res.status(201).json({ success: true, message: "Welcome ;)" });
});

//BOOK
app.use("/api/books", BookRoute);

//CATEGORY
app.use("/api/categories", CategoryRoute);

//USER
app.use("/api/users", UserRoute);

//AUTH
app.use("/api/auth", AuthRoute);

//ORDER
app.use("/api/orders", OrderRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on ${PORT} PORT`));
