import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./database/database.config";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import addressRoutes from "./routes/addressRoutes";

dotenv.config();
const app = express();

// db connection
db.sync()
  .then(() => {
    console.log(`Database connected successfully`);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/addresses", addressRoutes);





export default app;
