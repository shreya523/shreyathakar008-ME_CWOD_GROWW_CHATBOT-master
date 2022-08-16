const express = require("express");
const router = express.Router();
const userRoutes = require("./user-routes");
const getProducts = require("./get-products");
const chatbotRoutes = require("./Chatbot-routes/chatbotRoutes");

router.use("/chatbot", chatbotRoutes);
router.use("/user", userRoutes);
router.use("/", getProducts);

module.exports = router;
