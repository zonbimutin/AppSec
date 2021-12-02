const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middlewares/jwt");

const userController = require('../controllers/user');
const blogController = require('../controllers/blog');

const {
    test,
} = require("../controllers/main");


router.get("/users", userController.findAll);
router.get("/users/me", userController.findAll);
router.post("/users/create", userController.create);
router.post("/login", userController.login);

router.get("/blog", authenticateToken ,userController.login);
router.get("/blog/create", blogController.create);


module.exports = router;