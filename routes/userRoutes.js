import express from "express";
import {
  login,
  getUser,
  registerLandlord,
  registerTenant,
  allUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register/landlord", registerLandlord);
router.post("/register/tenant", registerTenant);
router.get("/profile/:userId", getUser);
router.get("/all", allUsers);

export default router;
