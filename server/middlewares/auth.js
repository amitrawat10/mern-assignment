import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return next(new ErrorHandler("Please login to access this resource", 401));

  const data = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(data.id);
  next();
});

export const checkUserRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role)
      // checking user role
      return next(
        new ErrorHandler("You are not allowed to access this resource", 403)
      );
    else next();
  };
};
