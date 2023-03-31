const express = require("express");
const { stationRouter } = require("../router/station.router");
const { userRouter } = require("./user.router");
const { TripRouter } = require("../router/trip.router");
const rootRouter = express.Router();
rootRouter.use("/stations", stationRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/trip", TripRouter);
module.exports = { rootRouter };
