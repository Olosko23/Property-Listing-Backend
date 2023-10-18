import Property from "../models/propertyModel.js";
import AsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// Create a Property
export const createProperty = AsyncHandler(async (req, res) => {
  try {
    const { files } = req;

    const images = [];

    for (const key of Object.keys(files)) {
      const image = files[key];
      const imageUrl = `/uploads/${image.name}`;
      images.push({ name: image.name, url: imageUrl });
      image.mv(`./public/uploads/${image.name}`, (err) => {
        if (err) {
          console.error("Error while saving image:", err);
        }
      });
    }

    const propertyData = {
      ...req.body,
      images: images,
    };

    const property = await Property.create(propertyData);
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// View an Individual Property
export const getPropertyById = AsyncHandler(async (req, res) => {
  try {
    const property = await Property.findById(req.params.propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Property
export const updateProperty = AsyncHandler(async (req, res) => {
  try {
    const property = await Property.findById(req.params.propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.createdBy.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this property" });
    }

    const files = req.files;

    const images = property.images ? [...property.images] : [];
    for (const key of Object.keys(files)) {
      const image = files[key];
      const imageUrl = `/uploads/${image.name}`;
      images.push({ name: image.name, url: imageUrl });
      image.mv(`./public/uploads/${image.name}`, (err) => {
        if (err) {
          console.error("Error while saving image:", err);
        }
      });
    }

    // Update the property
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.propertyId,
      {
        ...req.body,
        images: images,
      },
      { new: true }
    );

    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Properties (all properties)
export const getAllProperties = AsyncHandler(async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get User-Specific Properties
export const getUserProperties = AsyncHandler(async (req, res) => {
  try {
    const properties = await Property.find({ createdBy: req.user._id });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Properties for Rent
export const getPropertiesForRent = AsyncHandler(async (req, res) => {
  try {
    // Find all properties for rent
    const properties = await Property.find({ purpose: "rent" });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Properties for Sale
export const getPropertiesForSale = AsyncHandler(async (req, res) => {
  try {
    // Find all properties for sale
    const properties = await Property.find({ purpose: "sale" });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Properties by Location and Price Range
export const getPropertiesByLocationAndPrice = AsyncHandler(
  async (req, res) => {
    const { location, minPrice, maxPrice } = req.query;
    const query = {
      location: new RegExp(location, "i"),
      $and: [
        {
          $or: [
            { "price.sale": { $gte: minPrice } },
            { "price.rent": { $gte: minPrice } },
          ],
        },
        {
          $or: [
            { "price.sale": { $lte: maxPrice } },
            { "price.rent": { $lte: maxPrice } },
          ],
        },
      ],
    };

    const properties = await Property.find(query);
    res.status(200).json(properties);
  }
);

// Get Properties by Type
export const getPropertiesByType = AsyncHandler(async (req, res) => {
  try {
    const { type } = req.params;
    const properties = await Property.find({ type });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Properties by purpose
export const getPropertiesByPurpose = AsyncHandler(async (req, res) => {
  try {
    const { purpose } = req.params;
    const properties = await Property.find({ purpose });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
