const express = require("express");
const { authentication } = require("../middleware/auth/authentication");
const { stationExist } = require("../middleware/station.middleware");
const {
  createTrip,
  getTrips,
  removeTrip,
} = require("../controller/trip.controller");
const TripRouter = express.Router();
TripRouter.post("/create", createTrip);
TripRouter.get("/getTrip", getTrips);
TripRouter.delete("/deleteTrip/:id", removeTrip);

module.exports = { TripRouter };
