'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorito = sequelize.define('Favorito', {    
    usuarioId: DataTypes.STRING,
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