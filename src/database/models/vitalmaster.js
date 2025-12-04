'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Vitalmaster extends Model {
    static associate(models) {
      Vitalmaster.belongsTo(models.Clinic, {
        foreignKey: 'clinic_id',
        as: 'clinic',
      });
    }
  }

  Vitalmaster.init(
    {
      clinic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      parameter_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parameter_unit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parameter_status: {
        type: DataTypes.ENUM('Active', 'In-Active'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Vitalmaster',
      tableName: 'vitalmasters',
      timestamps: true,
    }
  );

  return Vitalmaster;
};
