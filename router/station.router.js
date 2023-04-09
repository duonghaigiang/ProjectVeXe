const express = require("express");
const { authentication } = require("../middleware/auth/authentication");
const { stationExist } = require("../middleware/station.middleware");
const { author } = require("../middleware/auth/authorize");
const {
  createStation,
  getListStation,
  getDetailStation,
  updateStation,
  removeStation,
  getLitmit,
} = require("../controller/station.controller");
const stationRouter = express.Router();
stationRouter.get("/", getListStation);
stationRouter.post("/", authentication, author, createStation);
stationRouter.get("/:id", authentication, stationExist, getDetailStation);
stationRouter.put("/:id", authentication, stationExist, updateStation);
stationRouter.delete("/:id", authentication, stationExist, removeStation);
stationRouter.post("/getLitmit", getLitmit);
module.exports = { stationRouter };
