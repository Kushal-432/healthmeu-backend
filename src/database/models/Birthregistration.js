'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Birthregistration extends Model {
    static associate(models) {
      // Each Birthregistration belongs to a Clinic
      Birthregistration.belongsTo(models.Clinic, {
        foreignKey: 'clinic_id',
        as: 'clinic',
      });

      // Each Birthregistration belongs to a Doctor
      Birthregistration.belongsTo(models.Doctor, {
        foreignKey: 'doctor_id',
        as: 'doctor',
      });
    }
  }

  Birthregistration.init(
    {
      clinic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      reg_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      baby_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      age: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      blood_group: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      sdwo_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      length_cm: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      weight_kg: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      head_circumference_cm: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      birth_type: {
        type: DataTypes.ENUM('Normal', 'Caesarean', 'Forceps'),
        allowNull: false,
      },
      btn_register: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.ENUM('Male', 'Female'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Birthregistration',
      tableName: 'birthregistrations',
    }
  );

  return Birthregistration;
};
