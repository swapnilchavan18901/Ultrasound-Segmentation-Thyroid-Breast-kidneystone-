const express = require("express");
const {
  registerUserByAdminController,
  getUsers,
  updateProfile,
  getProfile
} = require("../controllers/admin_controller");
const {
  registerUserByAdminValidation,
} = require("../validators/admin_validator");
const {
  authenticateToken,
  checkRole,
} = require("../middlewares/auth_middleware");

const router = express.Router();

router.post(
  "/users",
  authenticateToken,
  checkRole(["Admin"]),
  registerUserByAdminValidation,
  registerUserByAdminController
);
router.get("/users", authenticateToken, checkRole(["Admin"]), getUsers);
router.get("/user/:id", authenticateToken, checkRole(["Admin"]), getProfile);
router.put(
  "/profile/:id",
  authenticateToken,
  checkRole(["Admin"]),
  updateProfile
);

module.exports = router;
