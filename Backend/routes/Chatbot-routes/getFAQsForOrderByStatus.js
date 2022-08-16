const { FAQ } = require("../../models/FAQ");
const express = require("express");
const { Order } = require("../../models/order");
const router = express.Router();

router.use("/", async (req, res, next) => {
  try {
    const orderId = req.query.orderId;
    await Order.findById(orderId).then(async (order) => {
      const response = await FAQ.findOne({
        FAQCategoryName: `${order.orderStatus} Orders`,
      }).exec();
      res.status(200).json(response);
    });
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
