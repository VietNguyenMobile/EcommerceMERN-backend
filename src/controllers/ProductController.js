const ProductService = require("../services/ProductService");

const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { name, image, price, description, type, countInStock, rating } =
      req.body;

    if (
      !name ||
      !image ||
      !price ||
      !description ||
      !type ||
      !countInStock ||
      !rating
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const data = await ProductService.createProduct(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        error: "Missing the productId in required fields",
        status: "ERROR",
      });
    }

    const data = await ProductService.updateProduct(id, req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};

const getDetailsProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        error: "Missing the productId in required fields",
        status: "ERROR",
      });
    }
    const data = await ProductService.getProduct(id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    console.log("limit", limit);
    console.log("page", page);
    console.log("sort", sort); // asc or desc
    console.log("filter", filter);
    const data = await ProductService.getAllProduct(
      Number(limit),
      Number(page),
      sort,
      filter
    );
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        error: "Missing the productId in required fields",
        status: "ERROR",
      });
    }
    const data = await ProductService.deleteProduct(id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  getAllProduct,
  deleteProduct,
};
