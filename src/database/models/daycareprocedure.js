'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DaycareProcedure extends Model {
    static associate(models) {
      // Belongs to one Daycare
      DaycareProcedure.belongsTo(models.Daycare, {
        foreignKey: 'daycare_id',
        as: 'daycare',
        onDelete: 'CASCADE',
      });
    }
  }
  DaycareProcedure.init(
    {
      daycare_id: DataTypes.INTEGER,
      procedure_name: DataTypes.STRING,
      qty: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'DaycareProcedure',
    }
  );
  return DaycareProcedure;
};
