import express from "express";
import {
  createProperty,
  getPropertyById,
  updateProperty,
  getAllProperties,
  getPropertiesForRent,
  getPropertiesForSale,
  getPropertiesByLocationAndPrice,
  getPropertiesByType,
  getPropertiesByPurpose,
} from "../controllers/propertyController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isLandlord } from "../middleware/isLandlord.js";

const router = express.Router();

router.post("/", protect, isLandlord, createProperty);
router.get("/:propertyId", protect, getPropertyById);
router.put("/:propertyId", protect, isLandlord, updateProperty);
router.get("/", protect, getAllProperties);
router.get("/rent", protect, getPropertiesForRent);
router.get("/sale", protect, getPropertiesForSale);
router.get("/search", protect, getPropertiesByLocationAndPrice);
router.get("/type/:type", protect, getPropertiesByType);
router.get("/purpose/:purpose", protect, getPropertiesByPurpose);

export default router;
