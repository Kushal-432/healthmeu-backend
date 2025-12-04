'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Manageprescription extends Model {
    static associate(models) {
      // define association here if needed later
    }
  }

  Manageprescription.init(
    {
      clinic_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      top_margin: {
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: 'Top margin (in inches)',
      },
      left_margin: {
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: 'Left margin (in inches)',
      },
      right_margin: {
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: 'Right margin (in inches)',
      },
      bottom_margin: {
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: 'Bottom margin (in inches)',
      },
    },
    {
      sequelize,
      modelName: 'Manageprescription',
      tableName: 'manageprescriptions',
      timestamps: true,
    }
  );

  return Manageprescription;
};
