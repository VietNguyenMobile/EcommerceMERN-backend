const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req?.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

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

const authUserMiddleware = (req, res, next) => {
  const token = req?.headers["authorization"]?.split(" ")[1];
  const userId = req?.params?.id;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    if (decoded?.payload?.isAdmin || decoded?.payload?.id === userId) {
      next();
    } else {
      return res.status(401).json({ error: "Unauthorized 111" });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = { authMiddleware, authUserMiddleware };
