const { Trip, Station } = require("../models");
const createTrip = async (req, res) => {
  try {
    const { fromStation, toStation, startTime, price } = req.body;
    const trip = await Trip.create({
      fromStation,
      toStation,
      startTime,
      price,
    });
    if (trip) {
      res.send(" create trip susscess !");
    } else {
      res.send("that bai");
    }
  } catch (error) {
    res.send(" read data error");
  }
};
const getTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll({
      include: [
        { model: Station, as: "from" },

        { model: Station, as: "to" },
      ],
    });
    if (trips) {
      res.status(200).send(trips);
    } else {
      res.send("khong tim duoc");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const removeTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const tripDestroy = await Trip.destroy({
      where: { id: id },
    });
    if (tripDestroy) {
      res.send("thành công");
    } else {
      res.send("id không tồn tại");
    }
  } catch (error) {
    res.send("không lấy đcược id");
  }
};
module.exports = { createTrip, getTrips, removeTrip };
