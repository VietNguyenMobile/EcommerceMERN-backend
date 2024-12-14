const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");

router.post("/sign-up", UserController.createUser);
router.post("/sign-in", UserController.loginUser);
router.put("/update-user/:id", UserController.updateUser);
router.delete("/delete-user/:id", authMiddleware, UserController.deleteUser);
router.get("/getAll", authMiddleware, UserController.getAllUser);
router.get(
  "/get-details/:id",
  authUserMiddleware,
  UserController.getDetailsUser
);
router.post("/refresh-token", UserController.refreshToken);
router.get("/logout", UserController.userLogout);

module.exports = router;
