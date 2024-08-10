'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class homevideo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  homevideo.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    video: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'homevideo',
  });
  return homevideo;
};