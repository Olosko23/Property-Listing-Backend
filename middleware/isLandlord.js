export const isLandlord = (req, res, next) => {
  if (req.user && req.user.role === "Landlord") {
    next();
  } else {
    res.status(403).json({
      message:
        "Access denied. Only landlords are allowed to perform this action.",
    });
  }
};

