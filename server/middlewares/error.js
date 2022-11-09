import ErrorHandler from "../utils/ErrorHandler.js";

const error = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resourse not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  //  Wrong JWT error
  if (err.name === "jsonWebTokenError") {
    const message = `JWT is invalid, Try again`;
    err = new ErrorHandler(message, 400);
  }

  // expired jwt error
  if (err.name === "TokenExpiredError") {
    const message = `JWT expired, try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default error;
