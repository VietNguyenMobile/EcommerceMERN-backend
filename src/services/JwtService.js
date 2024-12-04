const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateAccessToken = async (payload) => {
  const access_token = jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return access_token;
};

const generateRefreshToken = async (payload) => {
  const refresh_token = jwt.sign({ payload }, process.env.JWT_SECRET_REFRESH, {
    expiresIn: "1d",
  });

  return refresh_token;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
