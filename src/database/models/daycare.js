'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Daycare extends Model {
    static associate(models) {
      // One Daycare has many DaycareProcedures
      Daycare.hasMany(models.DaycareProcedure, {
        foreignKey: 'daycare_id',
        as: 'procedures',
        onDelete: 'CASCADE',
      });
    }
  }
  Daycare.init(
    {
      clinic_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      ap_id: DataTypes.STRING,
      procedure_name: DataTypes.STRING,
      appointment_date: DataTypes.DATEONLY,
      full_name: DataTypes.STRING,
      doctor: DataTypes.STRING,
      gender: DataTypes.STRING,
      emergency_contact: DataTypes.STRING,
      next_visit_date: DataTypes.DATEONLY,
      email: DataTypes.STRING,
      consent_letter: DataTypes.STRING,
      item_fees: DataTypes.FLOAT,
      procedure_fees: DataTypes.FLOAT,
      other_fees: DataTypes.FLOAT,
      discount: DataTypes.FLOAT,
      collected_amount: DataTypes.FLOAT,
      pending_amount: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'Daycare',
    }
  );
  return Daycare;
};
