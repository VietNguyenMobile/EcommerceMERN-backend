const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
  console.log("Check token: ", req.headers["authorization"]);
  const token = req?.headers["authorization"]?.split(" ")[1];
  console.log("token", token);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);
    req.user = decoded;
    console.log("isAdmin", decoded?.payload?.isAdmin);
    if (decoded?.payload?.isAdmin) {
      next();
    } else {
      return res.status(401).json({ error: "Unauthorized 111" });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = { authMiddleware };
