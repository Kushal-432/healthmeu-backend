'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Disease extends Model {
    static associate(models) {
      // define associations later if needed
    }
  }

  Disease.init(
    {
      clinic_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      disease_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      symptoms: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Disease',
      tableName: 'diseases',
    }
  );

  return Disease;
};
