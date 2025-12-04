'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Manageservice extends Model {
    static associate(models) {
      // Each Service belongs to a clinic
      Manageservice.belongsTo(models.Clinic, {
        foreignKey: 'clinic_id',
        as: 'clinic',
      });
    }
  }

  Manageservice.init(
    {
      clinic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      service_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      gst: {
        type: DataTypes.DECIMAL(5, 2), // example: 18.00
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Manageservice',
      tableName: 'manageservices',
      timestamps: true,
    }
  );

  return Manageservice;
};
