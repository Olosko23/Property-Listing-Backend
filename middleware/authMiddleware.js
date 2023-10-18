import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      if (!req.user) {
        res.status(401);
        res.json("User not found");
      }

      next();
    } catch (error) {
      res.status(401);
      res.json("Not Authorized, token failed");
    }
  } else {
    res.status(401);
    res.json("Not authorized, no token");
  }
});
