const express = require("express");
const router = express.Router();
const getFAQsForLoggedInUser = require("./user-contex/getFAQsForLoggedInUser");
const getFAQsForNotLoggedInUser = require("./user-contex/getFAQsForNotLoggedInUser");

router.use("/logged-in", getFAQsForLoggedInUser, );
router.use("/not-logged-in", getFAQsForNotLoggedInUser);
module.exports = router;