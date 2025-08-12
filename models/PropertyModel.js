import mongoose from "mongoose";
import { PROPERTY_STATUS, PROPERTY_TYPE } from "../utils/constant.js";

const PropertySchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    tenantName: {
      type: String,
      default: "Vacant",
    },
    city: {
      type: String,
      default: "my city",
    },
    propertyStatus: {
      type: String,
      enum: Object.values(PROPERTY_STATUS),
      default: PROPERTY_STATUS.VACANT,
    },
    propertyType: {
      type: String,
      enum: Object.values(PROPERTY_TYPE),
      default: PROPERTY_TYPE.MINI_FLAT,
    },
    rentAmount: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    leaseStartDate: {
      type: Date,
      default: null,
    },
    leaseEndDate: {
      type: Date,
      default: null,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Property", PropertySchema);
