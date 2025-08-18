import Property from "../models/PropertyModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";

// ALL PROPERTY
export const getAllProperty = async (req, res) => {
  const { search, propertyStatus, propertyType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { address: { $regex: search, $options: "i" } },
      { tenantName: { $regex: search, $options: "i" } },
    ];
  }
  if (propertyStatus && propertyStatus !== "all") {
    queryObject.propertyStatus = propertyStatus;
  }
  if (propertyType && propertyType !== "all") {
    queryObject.propertyType = propertyType;
  }
  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };
  const sortKey = sortOptions[sort] || sortOptions.newest;

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const properties = await Property.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalProperties = await Property.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalProperties / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalProperties, numOfPages, currentPage: page, properties });
};

// CREATE PROPERTY
export const createProperty = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const property = await Property.create(req.body);
  res.status(StatusCodes.CREATED).json({ property });
};

// single property
export const getProperty = async (req, res) => {
  const { id } = req.params;
  const property = await Property.findById(id);
  if (!property) {
    return res.status(404).json({ msg: `no property with id ${id}` });
  }
  res.status(200).json({ property });
};

// Update Property
export const updateProperty = async (req, res) => {
  const { id } = req.params;
  const updatedProperty = await Property.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedProperty) {
    return res.status(404).json({ msg: `no property with id ${id}` });
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "property modified", property: updatedProperty });
};

// Delete Property
export const deleteProperty = async (req, res) => {
  const { id } = req.params;
  const removedProperty = await Property.findByIdAndDelete(id);

  if (!removedProperty) {
    return res.status(404).json({ msg: `no property with id ${id}` });
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "property deleted", property: removedProperty });
};

// Stats

export const showStats = async (req, res) => {
  let stats = await Property.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$propertyStatus", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    occupied: stats.occupied || 0,
    vacant: stats.vacant || 0,
    maintenance: stats.maintenance || 0,
    forRent: stats.forRent || 0,
    unavailable: stats.unavailable || 0,
    forSale: stats.forSale || 0,
  };

  let monthlyApplications = await Property.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
