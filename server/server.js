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

// // Only use morgan in development
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// // Security middleware
// app.use(helmet());
// app.use(mongoSanitize());

// // Basic middleware
// app.use(express.json());
// app.use(cookieParser());

// // CORS configuration
// app.use(
//   cors({
//     origin: process.env.NODE_ENV === "production" ? allowedOrigins : true,
//     credentials: true,
//   })
// );

// // API routes (these must come BEFORE the static file serving)
// app.use("/api/v1/properties", authenticateUser, propertyRouter);
// app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/users", authenticateUser, userRouter);

// // Serve static files in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.resolve(__dirname, "./client/dist")));

//   // Handle React routing - this should be the LAST route
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
//   });
// } else {
//   // Development route
//   app.get("/", (req, res) => {
//     res.send("Hello World - Development Mode");
//   });
// }

// // 404 handler for API routes (this won't be reached in production due to the * route above)
// app.use("/api/*", (req, res) => {
//   res.status(404).json({ msg: "API route not found" });
// });

// // Global error handler
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
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import cors from "cors";

// routers
import propertyRouter from "./routes/propertyRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

// middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

const app = express();
const port = process.env.PORT || 5100;

// Connect to MongoDB
try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("MongoDB connected");
} catch (error) {
  console.log(error);
  process.exit(1);
}

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// CORS configuration - simple and clean
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://ekoestate-tracker.vercel.app",
  process.env.CLIENT_URL,
];

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("Jobify API Server");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/properties", authenticateUser, propertyRouter);
app.use("/api/v1/users", authenticateUser, userRouter);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ msg: "route not found" });
});

// Error handler
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Server running on PORT ${port}...`);
});
