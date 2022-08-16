const { FAQ } = require("../../models/FAQ");
const express = require("express");
const router = express.Router();

var productMapper = {
  stocks: "Stocks",
  fds: "FDs",
  golds: "Gold",
  mutualfunds: "Mutual Funds",
};

router.use("/:category", async (req, res, next) => {
  try {
    const productCategory = productMapper[req.params.category];
    const response = await FAQ.findOne({
      FAQCategoryName: productCategory,
    }).exec();
    res.status(200).json(response);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
