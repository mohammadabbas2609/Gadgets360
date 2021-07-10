import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import path from "path";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middlewares/error.js";
import userRouter from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";
import morgan from "morgan";

const app = express();
dotenv.config();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/user", userRouter);
app.use("/api/orders", orderRoutes);

app.use("/api/upload", uploadRouter);

app.get("/api/config/razorpay", (req, res) => {
  res.status(200).send(process.env.RAZORPAY_CLIENT_ID);
});

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB();
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.green.bold
  )
);
