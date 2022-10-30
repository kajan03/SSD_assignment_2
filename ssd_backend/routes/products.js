const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/products", productController.getProduct);
router.post("/products", productController.addProduct);
router.put("/products", productController.updateProduct);
router.patch("/products", productController.patchProduct);
router.delete("/products", productController.deleteProduct);

module.exports = router;
