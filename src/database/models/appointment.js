'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    static associate(models) {
      // 🔗 Appointment belongs to Clinic
      Appointment.belongsTo(models.Clinic, {
        foreignKey: 'clinic_id',
        as: 'clinic',
      });

      // 🔗 Appointment belongs to Doctor
      Appointment.belongsTo(models.Doctor, {
        foreignKey: 'doctor_id',
        as: 'doctor',
      });
    }
  }

  Appointment.init(
    {
      clinic_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },

      doctor_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },

      appointment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      mobile_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      patient_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      visit_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      time_slot: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      health_concern: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      referred_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'appointments',
      modelName: 'Appointment',
    }
  );

  return Appointment;
};
