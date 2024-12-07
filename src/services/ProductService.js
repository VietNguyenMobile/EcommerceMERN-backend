const Product = require("../models/ProductModel");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, price, countInStock, rating, description } =
      newProduct;
    try {
      const checkProduct = await Product.findOne({
        name,
        image,
        type,
        price,
        countInStock,
        rating,
        description,
      });
      if (checkProduct) {
        return reject({ message: "Product already exists" });
      }
      const createProduct = await Product.create({
        name,
        image,
        type,
        price,
        countInStock,
        rating,
        description,
      });
      if (createProduct) {
        return resolve({
          status: "OK",
          message: "SUCCESS",
          data: createProduct,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateProduct = (id, productData) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, price, countInStock, rating, description } =
      productData;
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (!checkProduct) {
        return reject({ message: "Product does not exist" });
      }
      const updatedProduct = await Product.findOneAndUpdate(
        {
          _id: id,
        },
        {
          name,
          image,
          type,
          price,
          countInStock,
          rating,
          description,
        },
        {
          new: true,
        }
      );
      if (updatedProduct) {
        return resolve({
          status: "OK",
          message: "SUCCESS",
          data: updatedProduct,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (!checkProduct) {
        return reject({ message: "Product not found" });
      }
      return resolve({ status: "OK", message: "SUCCESS", data: checkProduct });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await Product.find();
      return resolve({ status: "OK", message: "SUCCESS", data: products });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (!checkProduct) {
        return reject({ message: "Product not found" });
      }
      await Product.findByIdAndDelete(id);
      return resolve({ status: "OK", message: "Delete product success" });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  getProduct,
  getAllProduct,
  deleteProduct,
};
