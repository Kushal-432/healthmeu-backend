'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Billheader extends Model {
    static associate(models) {
      // Link to Clinic
      Billheader.belongsTo(models.Clinic, {
        foreignKey: 'clinic_id',
        as: 'clinic',
      });
    }
  }

  Billheader.init(
    {
      clinic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      clinic_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gst: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bill_header_for: {
        type: DataTypes.ENUM('Pharmacy', 'Pathomeu', 'Hospital'),
        allowNull: false,
      },
      mobile_no: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      establishment_no: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      margin_header: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Billheader',
      tableName: 'billheaders',
    }
  );

  return Billheader;
};
