'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sosmed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      sosmed.belongsTo(models.link, {
        as: "link",
        foreignKey: {
          name: "idLink",
        },
      })
    }
  }
  sosmed.init({
    icon: DataTypes.STRING,
    url: DataTypes.STRING,
    titleLink: DataTypes.STRING,
    idLink: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'sosmed',
  });
  return sosmed;
};