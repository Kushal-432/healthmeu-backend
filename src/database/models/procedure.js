'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Procedure extends Model {
    static associate(models) {
      // Link to Clinic
      Procedure.belongsTo(models.Clinic, {
        foreignKey: 'clinic_id',
        as: 'clinic',
      });
    }
  }

  Procedure.init(
    {
      clinic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      procedure_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      gst: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Procedure',
      tableName: 'procedures',
    }
  );

  return Procedure;
};
