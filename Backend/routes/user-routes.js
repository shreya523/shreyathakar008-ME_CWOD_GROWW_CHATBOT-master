const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authController");
const orderRoutes = require("./order-routes");
const { User } = require("../models/user");

router.use("/signup", authController.signup);
router.use("/login", authController.login);
router.use("/orders", authController.protect, orderRoutes);
router.use("/get-user-by-id", authController.protect, async (req, res, next) => {
  try {
    const { userId } = req.query;
    const user = await User.findById(userId);
    res.status(200).json({user});
  } catch (err) {
    res.status(404).send();
  }
});

router.use("/", (req, res) => {
  res.status(404).send();
});

module.exports = router;
