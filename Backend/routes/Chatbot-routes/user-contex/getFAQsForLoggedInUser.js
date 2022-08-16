const { FAQ } = require("../../../models/FAQ");
const express = require("express");
const router = express.Router();
const authController = require("./../../../controllers/authController");

router.use("/", authController.protect, async (req, res, next) => {
  try {
    const { kycStatus } = req.query;
    const response = await FAQ.find({
      $or: [
        { FAQCategoryName: "Logged-in" },
        { FAQCategoryName: `KYC ${kycStatus}` },
      ],
    }).exec();
    res.status(200).json(response);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
