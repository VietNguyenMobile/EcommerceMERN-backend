const createUser = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve({ message: "User created" });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createUser,
};
