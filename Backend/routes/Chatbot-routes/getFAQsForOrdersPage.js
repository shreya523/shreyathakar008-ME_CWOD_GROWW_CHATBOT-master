const { FAQ } = require("./../../models/FAQ");
const express = require("express");
const router = express.Router();

router.use("/", async (req, res, next) => {
  try {
    const response = await FAQ.findOne({
      FAQCategoryName: "Orders",
    }).exec();
    res.status(200).json(response);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
