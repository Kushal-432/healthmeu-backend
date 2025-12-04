'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tpa extends Model {
    static associate(models) {
      // Each TPA belongs to a clinic
      Tpa.belongsTo(models.Clinic, {
        foreignKey: 'clinic_id',
        as: 'clinic',
      });
    }
  }

  Tpa.init(
    {
      clinic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name_of_insurer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      head_office: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gst_no_cin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      registration_no: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Tpa',
      tableName: 'tpas',
    }
  );

  return Tpa;
};
