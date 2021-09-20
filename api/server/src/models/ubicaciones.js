'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ubicaciones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Ubicaciones.init({
    latitude: DataTypes.NUMERIC,
    longitude: DataTypes.NUMERIC,
    usuarioId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ubicaciones',
  });
  return Ubicaciones;
};