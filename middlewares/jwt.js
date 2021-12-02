const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {

  try {

    const authHeader = req.headers["authorization"];
    const token = authHeader;

    const decoded =  jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded
    console.log(req.user)
    next()
  }
  catch (error) {
    console.log(error)
    res.sendStatus(401);
  }

};

module.exports = {
  authenticateToken,
};