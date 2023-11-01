"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reviewstation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Station, User }) {
      this.belongsTo(Station, { foreignKey: "id_station" });
      this.belongsTo(User, { foreignKey: "id_user" });
      // define association here
    }
  }
  Reviewstation.init(
    {
      id_user: {
        type: DataTypes.INTEGER,
      },
      id_station: {
        type: DataTypes.INTEGER,
      },
      content_review: {
        type: DataTypes.STRING,
      },
      number_star: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Reviewstation",
      timestamps: false,
    }
  );
  return Reviewstation;
};
