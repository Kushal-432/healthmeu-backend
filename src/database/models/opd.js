'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Opd extends Model {
    static associate(models) {
      // 🔗 Relationship: Opd belongs to Clinic
      Opd.belongsTo(models.Clinic, {
        foreignKey: 'clinic_id',
        as: 'clinic',
      });
    }
  }

  Opd.init(
    {
      clinic_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      ap_id: DataTypes.STRING,
      profile_img: DataTypes.STRING,
      uhid: DataTypes.STRING,
      abha_number: DataTypes.STRING,
      abha_address: DataTypes.STRING,
      mobile_number: DataTypes.STRING,
      email: DataTypes.STRING,
      view_history: DataTypes.BOOLEAN,
      arrival_time: DataTypes.STRING,
      panel_tpa: DataTypes.STRING,
      card_no: DataTypes.STRING,
      rank: DataTypes.STRING,
      revisiting_patient: DataTypes.STRING,
      dob: DataTypes.DATEONLY,
      appointment_date: DataTypes.DATEONLY,
      doctor_id: DataTypes.INTEGER,
      department: DataTypes.STRING,
      patient_name: DataTypes.STRING,
      guardian_name: DataTypes.STRING,
      relation: DataTypes.STRING,
      age: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      speciality: DataTypes.STRING,
      account_holder_name: DataTypes.STRING,
      health_concern: DataTypes.TEXT,
      appointment_type: DataTypes.STRING,
      lead_type: DataTypes.STRING,
      time_slot: DataTypes.STRING,
      referred_by: DataTypes.STRING,
      address: DataTypes.TEXT,
      remark: DataTypes.TEXT,
      consultation_fees: DataTypes.FLOAT,
      registration_fees: DataTypes.FLOAT,
      discount: DataTypes.FLOAT,
      collected_amount: DataTypes.FLOAT,
      pending_amount: DataTypes.FLOAT,
      payment_mode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Opd',
    }
  );

  return Opd;
};
