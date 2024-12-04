const UserService = require("../services/UserService");

const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, confirmPassword, phone } = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isCheckEmail = emailRegex.test(email);
    console.log("isCheckEmail", isCheckEmail);

    if (!name || !email || !password || !confirmPassword || !phone) {
      return res.status(400).json({ error: "Missing required fields" });
    } else if (!isCheckEmail) {
      return res.status(400).json({ error: "Email is invalid" });
    } else if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "Password and confirm password do not match" });
    }

    const data = await UserService.createUser(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};
const loginUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, phone } = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isCheckEmail = emailRegex.test(email);
    console.log("isCheckEmail", isCheckEmail);

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ error: "Missing required fields" });
    } else if (!isCheckEmail) {
      return res.status(400).json({ error: "Email is invalid" });
    }
    const data = await UserService.loginUser(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (!id) {
      return res.status(400).json({
        error: "Missing the userId in required fields",
        status: "ERROR",
      });
    }
    const dataResponse = await UserService.updateUser(id, req.body);
    return res.status(200).json(dataResponse);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
};
