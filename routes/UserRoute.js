const UserController = require("../controllers/UserController");
const express = require("express");
const pool = require("../helpers/database");
const router = express.Router();

router.get("/users", UserController.getAllUserData);

module.exports = router;
