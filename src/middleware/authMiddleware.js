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

    if (decoded?.isAdmin) {
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

  console.log("authUserMiddleware req?.headers: ", req?.headers);  

  const token = req?.headers["authorization"]?.split(" ")[1];

  const token2 = req?.headers?.token?.split(" ")[1]; 

  console.log("token2: ", token2);

  console.log("token: ", token);
  const userId = req?.params?.id;
  console.log("userId: ", userId);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("decoded: ", decoded);

    req.user = decoded;

    if (decoded?.isAdmin || decoded?.id === userId) {
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
