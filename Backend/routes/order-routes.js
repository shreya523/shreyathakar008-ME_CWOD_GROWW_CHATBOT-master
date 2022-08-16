const express = require("express");
const router = express.Router();
const { Order } = require("./../models/order");

router.post("/", async (req, res) => {
  const userId = req.user._id;
  try {
    let allOrders = await Order.find({ userId }).populate("productDocs").exec();
    if (
      allOrders !== null &&
      allOrders !== undefined &&
      allOrders.length !== 0
    ) {
      allOrders = allOrders.map((order) => {
        delete order.userId;
        order = order.toObject();
        return { ...order };
      });
      res.status(200).json(allOrders);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.sendStatus(404);
  }
});

router.post("/:orderId", async (req, res) => {
  const { orderId } = req.params;
  try {
    let order = await Order.find({ _id: orderId })
      .populate("productDocs")
      .exec();
    res.status(200).json(order);
  } catch (err) {
    res.sendStatus(404);
  }
});

router.get("/get-order-by-ProductUserId", async (req, res) => {
  const { productId, userId } = req.query;
  try {
    let order = await Order.find({ products: productId, userId })
      .populate("productDocs")
      .exec();
    res.status(200).json(order);
  } catch (err) {
    res.sendStatus(404);
  }
});

module.exports = router;
