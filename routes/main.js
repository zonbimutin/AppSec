const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middlewares/jwt");

const userController = require('../controllers/user');

const {
    test,
} = require("../controllers/main");



router.get("/users", userController.findAll);
router.get("/users/create", userController.create);
router.get("/login", userController.login);

router.get("/blog", authenticateToken ,userController.login);


module.exports = router;