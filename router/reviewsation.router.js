const express = require("express");
const { authentication } = require("../middleware/auth/authentication");
const { creatReviewSation } = require("../controller/reviewStation.controller");
const reviewsation = express.Router();
reviewsation.post("/reviewStaion", authentication, creatReviewSation);
module.exports = {
  reviewsation,
};
