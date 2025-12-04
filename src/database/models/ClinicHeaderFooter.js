'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ClinicHeaderFooter extends Model {
    static associate(models) {
      // Link to clinic
      ClinicHeaderFooter.belongsTo(models.Clinic, {
        foreignKey: 'clinic_id',
        as: 'clinic',
      });
      // Optional: Link to Doctor if needed
      ClinicHeaderFooter.belongsTo(models.Doctor, { foreignKey: 'doctor_id', as: 'doctor' });
    }
  }

  ClinicHeaderFooter.init(
    {
      clinic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      header_image: DataTypes.STRING,
      header_margin: DataTypes.FLOAT,
      footer_image: DataTypes.STRING,
      footer_margin: DataTypes.FLOAT,
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      top_margin: DataTypes.FLOAT,
      bottom_margin: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'ClinicHeaderFooter',
      tableName: 'clinic_header_footers',
    }
  );

  return ClinicHeaderFooter;
};
