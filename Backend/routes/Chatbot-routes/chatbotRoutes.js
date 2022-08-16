const express = require("express");
const router = express.Router();
const getFAQsForProductsPage = require("./getFAQsForProductsPage.js");
const getFAQsForOrdersPage = require("./getFAQsForOrdersPage");
const getFAQsUser = require("./getFAQsUser");
const getFAQsForProductDetailsPage = require("./getFAQsForProductDetailsPage");
const getFAQsForOrderByStatus = require("./getFAQsForOrderByStatus");

router.use("/get-productPage-FAQs", getFAQsForProductsPage);
router.use("/get-orderPage-FAQs", getFAQsForOrdersPage);
router.use("/get-user-FAQs", getFAQsUser);
router.use("/get-product-specific-FAQs", getFAQsForProductDetailsPage);
router.use("/get-order-FAQs-by-status", getFAQsForOrderByStatus);
module.exports = router;
