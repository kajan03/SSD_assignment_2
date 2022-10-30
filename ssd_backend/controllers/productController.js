//GET Product Route
const getProduct = (req, res, next) => {
  res.status(200).status(200).json({ message: "Products sent successfully" });
};

//POST Product Route
const addProduct = (req, res, next) => {
  res.status(201).json({ message: "Product added successfully" });
};

//PUT Product Route
const updateProduct = (req, res, next) => {
  res.status(200).json({ message: "Product updated successfully" });
};

//PATCH Product Route
const patchProduct = (req, res, next) => {
  res.status(200).json({ message: "Product updated successfully" });
};

//DELETE Product Route
const deleteProduct = (req, res, next) => {
  res.status(200).json({ message: "Product deleted successfully" });
};

module.exports = {
  getProduct,
  addProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};
