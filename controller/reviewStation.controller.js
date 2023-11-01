const { response } = require("express");
const { Op } = require("sequelize");
const { Reviewstation, sequelize } = require("../models");
const creatReviewSation = async (req, res) => {
  try {
    const { user } = req;
    const { star, content, station_id } = req.body;

    await Reviewstation.create({
      id_user: user.id,
      id_station: station_id,
      content_review: content,
      number_star: star,
    });
    res.send("Ss");
  } catch (error) {
    res.send(error);
  }
};
module.exports = { creatReviewSation };
