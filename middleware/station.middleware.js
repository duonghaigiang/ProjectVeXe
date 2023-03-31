const { Station } = require("../models");
const stationExist = async (req, res, next) => {
  const { id } = req.params;
  const station = await Station.findOne({
    where: {
      id: id,
    },
  });
  if (station) {
    next();
  } else {
    res.status(500).send("station không tồn tại");
  }
};

module.exports = { stationExist };
