'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Diagnosis extends Model {
    static associate(models) {
      // associations later if needed
    }
  }

  Diagnosis.init(
    {
      clinic_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      diagnosis_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      diagnosis_details: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Diagnosis',
      tableName: 'diagnoses',
    }
  );

  return Diagnosis;
};
