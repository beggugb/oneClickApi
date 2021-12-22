'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorito = sequelize.define('Favorito', {    
    cargo: DataTypes.STRING,
    requisitos: DataTypes.STRING,
    caracteristicas: DataTypes.STRING,
    tipo: DataTypes.STRING,
    fvencimiento: DataTypes.DATE,
    clienteId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cliente',
        key: 'id',
        as: 'clienteId'
      }
    },
  }, {});
  Favorito.associate = function(models) {
    // associations can be defined here    
    Favorito.belongsTo(models.Cliente,{
      foreignKey: 'clienteId',
      onDelete: 'CASCADE'
    }); 
  };
  return Favorito;
};