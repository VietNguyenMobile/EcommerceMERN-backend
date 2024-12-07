const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const { generateAccessToken, generateRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser;
    try {
      const checkUer = await User.findOne({ email });
      if (checkUer) {
        return reject({ message: "Email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hashSync(password, salt);
      const createUser = await User.create({
        name,
        email,
        password: hashPassword,
        phone,
      });
      if (createUser) {
        return resolve({ status: "OK", message: "SUCCESS", data: createUser });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const loginUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, phone } = userData;
    try {
      const checkUer = await User.findOne({ email });
      if (checkUer === null) {
        return reject({ message: "Email does not exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hashSync(password, salt);
      const comparePassword = await bcrypt.compare(password, checkUer.password);
      if (!comparePassword) {
        return reject({ message: "Password is incorrect" });
      }
      const access_token = await generateAccessToken({
        id: checkUer._id,
        isAdmin: checkUer.isAdmin,
      });
      const refresh_token = await generateRefreshToken({
        id: checkUer._id,
        isAdmin: checkUer.isAdmin,
      });

      return resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        return reject({ message: "User not found" });
      }
      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
      return resolve({ status: "OK", message: "SUCCESS", data: updatedUser });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        return reject({ message: "User not found" });
      }
      await User.findByIdAndDelete(id);
      return resolve({ status: "OK", message: "Delete user success" });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await User.find();

      return resolve({
        status: "OK",
        message: "SUCCESS",
        data: users,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getDetailsUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        return reject({ message: "User not found" });
      }

      return resolve({ status: "OK", message: "SUCCESS", data: checkUser });
    } catch (error) {
      console.log("error service: ", error);
      reject(error);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
};
