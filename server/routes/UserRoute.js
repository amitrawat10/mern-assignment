import express from "express";
import { checkUserRole, isAuthenticatedUser } from "../middlewares/auth.js";
import {
  registerUser,
  loginUser,
  logout,
  updateUser,
  updatePassword,
  getUserDetails,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUserByAdmin,
  createUser,
} from "../controllers/userController.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/me/update").put(isAuthenticatedUser, updateUser);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

// admin routes
router
  .route("/admin/user/new")
  .post(isAuthenticatedUser, checkUserRole("admin"), createUser);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, checkUserRole("admin"), getAllUsers);
router
  .route("/admin/user/:userId")
  .get(isAuthenticatedUser, checkUserRole("admin"), getSingleUser)
  .put(isAuthenticatedUser, checkUserRole("admin"), updateUserByAdmin)
  .delete(isAuthenticatedUser, checkUserRole("admin"), deleteUser);

export default router;
