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
        reject({ message: "Product already exists" });
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
        resolve({
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
        reject({ message: "Product does not exist" });
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
        resolve({
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

const getAllProduct = (limit = 8, page = 1, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("getAllProduct limit: ", limit);
      console.log("getAllProduct page: ", page);
      console.log("getAllProduct sort: ", sort);
      console.log("getAllProduct filter: ", filter);
      const totalProduct = await Product.countDocuments();
      if (filter) {
        const objectFilter = {};
        objectFilter[filter[0]] = filter[1];
        console.log("objectFilter", objectFilter);
        const labelFilter = filter[0];
        const products = await Product.find({
          [filter[0]]: { $regex: filter[1], $options: "i" },
        })
          .limit(limit)
          .skip((page - 1) * limit);

        resolve({
          status: "OK",
          message: "SUCCESS",
          data: products,
          total: totalProduct,
          pageCurrent: page,
          limit: limit,
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        console.log("objectSort", objectSort);

        const products = await Product.find()
          .limit(limit)
          .skip((page - 1) * limit)
          .sort(objectSort);

        resolve({
          status: "OK",
          message: "SUCCESS",
          data: products,
          total: totalProduct,
          pageCurrent: page,
          limit: limit,
          totalPage: Math.ceil(totalProduct / limit),
        });
      } else {
        const products = await Product.find()
          .limit(limit)
          .skip((page - 1) * limit);

        resolve({
          status: "OK",
          message: "SUCCESS",
          data: products,
          total: totalProduct,
          pageCurrent: page,
          limit: limit,
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
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
