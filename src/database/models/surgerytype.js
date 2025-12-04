'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Surgerytype extends Model {
    static associate(models) {
      // Each Surgerytype belongs to a clinic
      Surgerytype.belongsTo(models.Clinic, {
        foreignKey: 'clinic_id',
        as: 'clinic',
      });
    }
  }

  Surgerytype.init(
    {
      clinic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      surgery_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Surgerytype',
      tableName: 'surgerytypes',
    }
  );

  return Surgerytype;
};
