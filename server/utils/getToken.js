export default (user, statusCode, res) => {
  const token = user.getJWTToken(); // getting the jwt token from User model
  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
    })
    .json({
      success: true,
      user,
      token,
    });
};
