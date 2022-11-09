import User from "../models/userModel.js";
import sendToken from "../utils/getToken.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";

export const registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, confirmPassword, city, mobile, adminCreate } =
    req.body;
  if (!name || !email || !password || !confirmPassword || !city || !mobile)
    return next(new ErrorHandler("Please fill all fields", 400));

  if (password !== confirmPassword)
    return next(
      new ErrorHandler("password and confirm password should match", 400)
    );

  const user = await User.create({
    name,
    email,
    password,
    city,
    mobile,
  });

  if (!adminCreate) sendToken(user, 200, res);
  else sendToken(req.user, 200, res);
});

export const createUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, confirmPassword, city, mobile } = req.body;
  if (!name || !email || !password || !confirmPassword || !city || !mobile)
    return next(new ErrorHandler("Please fill all fields", 400));

  if (password !== confirmPassword)
    return next(
      new ErrorHandler("password and confirm password should match", 400)
    );

  const user = await User.create({
    name,
    email,
    password,
    city,
    mobile,
  });

  res.statusCode(200).json({ success: true, user });
  //  sendToken(req.user, 200, res);
});

export const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorHandler("Please fill all fields", 400));

  const isUserExists = await User.findOne({ email }).select("+password");
  if (isUserExists) {
    const passwordMatch = isUserExists.comparePassword(password);
    if (passwordMatch) {
      sendToken(isUserExists, 200, res);
    } else {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  } else {
    return next(new ErrorHandler("User does not exist", 401));
  }
});

export const logout = catchAsyncError(async (req, res, next) => {
  res.cookit("token", null, { expires: new Date(Date.now()), httpOnly: true });
  res.status(200).json({ success: true, message: "logged out!" });
});

export const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

export const updateUser = catchAsyncError(async (req, res, next) => {
  const newUser = {
    name: req.body.name,
    email: req.body.name,
    city: req.body.city,
    mobile: req.body.mobile,
  };
  const user = await User.findByIdAndUpdate(req.user.id, newUser, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true });
});

// update password
export const updatePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, password, confirmPassword } = req.body;
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatch = user.comparePassword(oldPassword);
  if (isPasswordMatch) {
    if (password !== confirmPassword)
      return next(new ErrorHandler("Password & confim password should match"));
    else {
      user.password = password;
      await user.save();
      sendToken(user, 200, res);
    }
  } else {
    return next(new ErrorHandler("Old Password is wrong", 400));
  }
  res.status(200).json({ success: true });
});

// get user list
export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find({ role: { $ne: "admin" } }).sort({
    createdAt: -1,
  });
  res.status(200).json({ success: true, users });
});

// get single user (admin)
export const getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user)
    return next(new ErrorHandler("User does not exist with this id", 400));
  res.status(200).json({ success: true, user });
});

export const updateUserByAdmin = catchAsyncError(async (req, res, next) => {
  const { userId } = req.params;
  if (!userId) return next(new ErrorHandler("wrong id", 400));
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    city: req.body.city,
    mobile: req.body.mobile,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(userId, newUser, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true });
});

// delete user
export const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user)
    return next(new ErrorHandler("User does not exist with this id", 400));
  await User.findByIdAndDelete(req.params.userId);
  res.status(200).json({ success: true, message: "user deleted" });
});
