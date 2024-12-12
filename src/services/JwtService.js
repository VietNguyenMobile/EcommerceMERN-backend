const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateAccessToken = async (payload) => {
  const access_token = jwt.sign({ ...payload }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return access_token;
};

const generateRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    { ...payload },
    process.env.JWT_SECRET_REFRESH,
    {
      expiresIn: "1d",
    }
  );

  return refresh_token;
};

const refreshToken = async (token) => {
  // const refresh_token = jwt.sign({ token }, process.env.JWT_SECRET_REFRESH, {
  //   expiresIn: "2h",
  // });
  // return refresh_token;
  return new Promise(async (resolve, reject) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_REFRESH);

      // console.log("decoded: ", decoded);

      const access_token = await generateAccessToken(decoded.payload);

      return resolve({ status: "OK", message: "SUCCESS", access_token });
    } catch (error) {
      return reject(error);
    }
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  refreshToken,
};
