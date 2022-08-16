const express = require("express");
const { Product } = require("../models/product");
const { Order } = require("../models/order");
const router = express.Router();

var productMapper = {
  stocks: "Stocks",
  fds: "FDs",
  golds: "Gold",
  mutualfunds: "Mutual Funds",
  Stocks: "Stocks",
  FDs: "FDs",
  Gold: "Gold",
  "Mutual Funds": "Mutual Funds",
};

router.get("/:productCategory", async (req, res, next) => {
  try {
    const productCategory = productMapper[req.params.productCategory];
    const product = await Product.find({ productCategory });
    res.status(200).json(product);
  } catch (err) {
    res.status(404).send();
  }
});

router.get("/getProductsById/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.find({ _id: productId });
    res.status(200).json(product);
  } catch (err) {
    res.status(404).send();
  }
});

router.use("/", (req, res) => {
  res.status(404).send();
});

module.exports = router;
