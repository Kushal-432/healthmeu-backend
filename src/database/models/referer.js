'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Referer extends Model {
    static associate(models) {
      // Each referer belongs to a clinic
      Referer.belongsTo(models.Clinic, {
        foreignKey: 'clinic_id',
        as: 'clinic',
      });
    }
  }

  Referer.init(
    {
      clinic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      incentive: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Referer',
      tableName: 'referers',
    }
  );

  return Referer;
};
