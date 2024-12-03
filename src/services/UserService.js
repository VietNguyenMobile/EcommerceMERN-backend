const User = require("../models/UserModel");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser;
    try {
      const checkUer = await User.findOne({ email });
      if (checkUer) {
        return reject({ message: "Email already exists" });
      }
      const createUser = await User.create({
        name,
        email,
        password,
        confirmPassword,
        phone,
      });
      if (createUser) {
        return resolve({ message: "Success", data: createUser });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createUser,
};
