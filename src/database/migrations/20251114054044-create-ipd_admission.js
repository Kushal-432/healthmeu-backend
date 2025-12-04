'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ipd_admissions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      clinic_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      profile_img: Sequelize.STRING,
      ap_id: Sequelize.STRING,

      abha_number: Sequelize.STRING,
      abha_address: Sequelize.STRING,

      adhar_number: { type: Sequelize.STRING, allowNull: false },
      registration_number: { type: Sequelize.STRING, allowNull: false },
      mobile_number: { type: Sequelize.STRING, allowNull: false },

      patient_name: { type: Sequelize.STRING, allowNull: false },
      dob: Sequelize.DATEONLY,
      age_years: Sequelize.INTEGER,
      age_months: Sequelize.INTEGER,
      age_days: Sequelize.INTEGER,

      gender: Sequelize.STRING,
      marital_status: Sequelize.STRING,
      occupation: Sequelize.STRING,
      religion: Sequelize.STRING,
      reference_type: Sequelize.STRING,

      address: Sequelize.TEXT,
      pin: Sequelize.STRING,
      state: Sequelize.STRING,
      district: Sequelize.STRING,
      thana: Sequelize.STRING,
      tehsil: Sequelize.STRING,
      block: Sequelize.STRING,

      arrival_date: Sequelize.DATEONLY,
      arrival_time: Sequelize.STRING,
      admission_date: Sequelize.DATEONLY,

      provisional_diagnosis: Sequelize.TEXT,
      treatment: Sequelize.TEXT,
      remarks: Sequelize.TEXT,

      icd_code: Sequelize.STRING,
      refer_by: Sequelize.STRING,

      blood_group: Sequelize.STRING,
      blood_sign: Sequelize.STRING,
      admission_type: Sequelize.STRING,

      doctor_id: Sequelize.INTEGER,
      paramedic_staff: Sequelize.STRING,

      insurance_name: Sequelize.STRING,
      tpa_approved_amount: Sequelize.STRING,
      insurance_approval: Sequelize.STRING,

      bed_type: Sequelize.STRING,
      bed: Sequelize.STRING,
      doctor_fees: Sequelize.STRING,
      total_surgery_cost: Sequelize.STRING,

      contact_person1_name: Sequelize.STRING,
      contact_person1_mobile: Sequelize.STRING,
      contact_person2_name: Sequelize.STRING,
      contact_person2_mobile: Sequelize.STRING,

      guardian_name: Sequelize.STRING,
      guardian_relation: Sequelize.STRING,
      guardian_mobile: Sequelize.STRING,

      insurance_company_name: Sequelize.STRING,
      payer_name: Sequelize.STRING,
      card_no: Sequelize.STRING,
      policy_no: Sequelize.STRING,
      rank: Sequelize.STRING,
      rate_list: Sequelize.STRING,

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('ipd_admissions');
  },
};
