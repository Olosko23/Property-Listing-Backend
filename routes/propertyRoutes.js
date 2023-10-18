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

router.post("/", createProperty);
router.get("/:propertyId", getPropertyById);
router.put("/:propertyId", updateProperty);
router.get("/", getAllProperties);
router.get("/rent", getPropertiesForRent);
router.get("/sale", getPropertiesForSale);
router.get("/search", getPropertiesByLocationAndPrice);
router.get("/type/:type", getPropertiesByType);
router.get("/purpose/:purpose", getPropertiesByPurpose);

export default router;
