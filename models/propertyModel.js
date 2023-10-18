import mongoose from "mongoose";

const propertyTypes = [
  "house",
  "apartment",
  "condo",
  "townhouse",
  "villa",
  "land",
  "commercial",
];

const propertyPurposes = ["rent", "sale"];

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: propertyTypes,
    },
    purpose: {
      type: String,
      required: true,
      enum: propertyPurposes,
    },
    price: {
      sale: {
        type: Number,
        required: function () {
          return this.purpose === "sale";
        },
      },
      rent: {
        type: Number,
        required: function () {
          return this.purpose === "rent";
        },
      },
    },
    location: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
    },
    images: [
      {
        name: String,
        url: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", propertySchema);

export default Property;
