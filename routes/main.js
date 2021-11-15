const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middlewares/jwt");

const {
    test,
} = require("../controllers/main");



router.get("/test", test);
module.exports = router;