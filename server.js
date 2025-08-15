// import "express-async-errors";
// import * as dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// const app = express();
// import morgan from "morgan";
// import mongoose from "mongoose";
// import cookieParser from "cookie-parser";
// import cloudinary from "cloudinary";
// import helmet from "helmet";
// import mongoSanitize from "express-mongo-sanitize";
// import cors from "cors";

// // routers
// import propertyRouter from "./routes/propertyRouter.js";
// import authRouter from "./routes/authRouter.js";
// import userRouter from "./routes/userRouter.js";

// // public
// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import path from "path";

// // middleware
// import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
// import { authenticateUser } from "./middleware/authMiddleware.js";

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// const __dirname = dirname(fileURLToPath(import.meta.url));

// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:3000",
//   process.env.CLIENT_URL,
// ];

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }
// app.use(express.static(path.resolve(__dirname, "./client/dist")));

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// app.use(morgan("dev"));
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: process.env.NODE_ENV === "production" ? allowedOrigins : true,
//     credentials: true,
//   })
// );

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.use("/api/v1/properties", authenticateUser, propertyRouter);
// app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/users", authenticateUser, userRouter);

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
// });

// app.use("*", (req, res) => {
//   res.status(404).json({ msg: "not found" });
// });

// app.use(errorHandlerMiddleware);

// const port = process.env.PORT || 5100;

// try {
//   await mongoose.connect(process.env.MONGO_URL);
//   app.listen(port, () => {
//     console.log(`server running on PORT ${port}...`);
//   });
// } catch (error) {
//   console.log(error);
//   process.exit(1);
// }

import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";

// routers
import propertyRouter from "./routes/propertyRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

// public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL,
];

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(helmet());
app.use(mongoSanitize());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? allowedOrigins : true,
    credentials: true,
  })
);

// Serve static files ONLY in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "./client/dist")));
}

// API Routes - these must come BEFORE the catch-all route
app.use("/api/v1/properties", authenticateUser, propertyRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);

// Serve React app for all non-API routes (ONLY in production)
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
  });
} else {
  // Development mode
  app.get("/", (req, res) => {
    res.send("API is working - Development Mode");
  });

  // 404 for non-API routes in development
  app.use("*", (req, res) => {
    res.status(404).json({ msg: "not found" });
  });
}

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
