import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import upload from "express-fileupload";

import User from "./routes/userRoutes.js";
import Properties from "./routes/propertyRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(upload());
dotenv.config();

const URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 7050;

mongoose
  .connect(URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Mongo DB Connected and Server Running on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/v1/users", User);
app.use("/api/v1/properties", Properties);

app.get("/api/v1/status", (req, res) => {
  try {
    const isServerRunning = true;

    if (isServerRunning) {
      res.status(200).json("Server is Running");
    } else {
      res.status(500).json("Server is not running");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
