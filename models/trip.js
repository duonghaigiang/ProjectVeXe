"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Station }) {
      // define association
      this.belongsTo(Station, { foreignKey: "fromStation", as: "from" });
    }
  }
  Trip.init(
    {
      startTime: {
        type: DataTypes.DATE,
      },
      price: {
        type: DataTypes.FLOAT,
      },
    },
    {
      sequelize,
      modelName: "Trip",
    }
  );
  return Trip;
};
