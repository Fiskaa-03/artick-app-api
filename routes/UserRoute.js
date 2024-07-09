const UserController = require("../controllers/UserController");
const express = require("express");
const { verifyUser } = require("../middlewares/AuthUser.js");
const router = express.Router();

router.get("/me", UserController.Me);
router.get("/users", verifyUser, UserController.getAllUserData);
router.post("/user", UserController.Register);
router.post("/login", UserController.Login);
router.delete("/logout", UserController.Logout);

module.exports = router;
