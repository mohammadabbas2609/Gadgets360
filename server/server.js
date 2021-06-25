import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import path from "path";
import connectDB from "./config/db.js";
import router from "./routes/productRoutes.js";

const app = express();
dotenv.config({ path: path.resolve() + "/server/config/config.env" });

app.use("/api/products", router);

const PORT = process.env.PORT || 5000;
connectDB();
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.green.bold
  )
);
