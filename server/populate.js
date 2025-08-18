import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Property from "./models/PropertyModel.js";
import User from "./models/UserModel.js";

try {
  await mongoose.connect(process.env.MONGO_URL);
  const user = await User.findOne({ email: "Barsheyr@gmail.com" });
  //   const user = await User.findOne({ email: "test@test.com" });

  const jsonProperties = JSON.parse(
    await readFile(new URL("./utils/mockData.json", import.meta.url))
  );
  const properties = jsonProperties.map((property) => {
    return { ...property, createdBy: user._id };
  });
  await Property.deleteMany({ createdBy: user._id });
  await Property.create(properties);
  console.log("Success!!!");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
