'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Managedocument extends Model {
    static associate(models) {
      Managedocument.belongsTo(models.Clinic, {
        foreignKey: 'clinic_id',
        as: 'clinic',
      });
    }
  }

  Managedocument.init(
    {
      clinic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      prefix_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      document_type: {
        type: DataTypes.ENUM('IPD Registration', 'Product Bill/Invoice'),
        allowNull: false,
      },
      prefix_status: {
        type: DataTypes.ENUM('Active', 'In-Active'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Managedocument',
      tableName: 'managedocuments',
      timestamps: true,
    }
  );

  return Managedocument;
};
