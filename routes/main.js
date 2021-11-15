const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middlewares/jwt");

const userController = require('../controllers/user');

const {
    test,
} = require("../controllers/main");



router.get("/test", test);
router.get("/users", userController.findAll);
module.exports = router;