const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateAccessToken = async (payload) => {
  const access_token = jwt.sign({ ...payload }, process.env.JWT_SECRET, {
    expiresIn: "1m",
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

const refreshTokenJwtService = async (token) => {
  // const refresh_token = jwt.sign({ token }, process.env.JWT_SECRET_REFRESH, {
  //   expiresIn: "2h",
  // });
  // return refresh_token;
  return new Promise(async (resolve, reject) => {
    try {
      console.log("refreshTokenJwtService token: ", token);
      jwt.verify(token, process.env.JWT_SECRET_REFRESH, async (err, user) => {
        if (err) {
          console.log("refreshTokenJwtService err: ", err);
          resolve({
            status: "ERROR",
            message: "The token is invalid",
          });
        }
        console.log("refreshTokenJwtService user: ", user);
        // const { payload } = user;
        const access_token = await generateAccessToken({
          id: user.id,
          isAdmin: user.isAdmin,
        });

        console.log("refreshTokenJwtService access_token: ", access_token);

        resolve({
          status: "OK",
          message: "SUCCESS",
          access_token,
        });
      });
    } catch (error) {
      return reject(error);
    }
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  refreshTokenJwtService,
};
