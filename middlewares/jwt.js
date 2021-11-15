const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    console.log(err);
    if (err) return res.sendStatus(403);

    console.log(decoded.username)

    // TODO => check de l'auth

    next();
  });
};

module.exports = {
  authenticateToken,
};