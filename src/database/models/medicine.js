'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Medicine extends Model {
    static associate(models) {
      // define associations later if needed
    }
  }

  Medicine.init(
    {
      clinic_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      medicine_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Medicine',
      tableName: 'medicines',
    }
  );

  return Medicine;
};
