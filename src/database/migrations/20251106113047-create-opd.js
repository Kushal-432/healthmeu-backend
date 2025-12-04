'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Opds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      clinic_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Clinics', // Table name in database
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ap_id: {
        type: Sequelize.STRING,
      },
      profile_img: {
        type: Sequelize.STRING,
      },
      uhid: {
        type: Sequelize.STRING,
      },
      abha_number: {
        type: Sequelize.STRING,
      },
      abha_address: {
        type: Sequelize.STRING,
      },
      mobile_number: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      view_history: {
        type: Sequelize.BOOLEAN,
      },
      arrival_time: {
        type: Sequelize.STRING,
      },
      panel_tpa: {
        type: Sequelize.STRING,
      },
      card_no: {
        type: Sequelize.STRING,
      },
      rank: {
        type: Sequelize.STRING,
      },
      revisiting_patient: {
        type: Sequelize.STRING,
      },
      dob: {
        type: Sequelize.DATEONLY,
      },
      appointment_date: {
        type: Sequelize.DATEONLY,
      },
      doctor_id: {
        type: Sequelize.INTEGER,
      },
      department: {
        type: Sequelize.STRING,
      },
      patient_name: {
        type: Sequelize.STRING,
      },
      guardian_name: {
        type: Sequelize.STRING,
      },
      relation: {
        type: Sequelize.STRING,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      gender: {
        type: Sequelize.STRING,
      },
      speciality: {
        type: Sequelize.STRING,
      },
      account_holder_name: {
        type: Sequelize.STRING,
      },
      health_concern: {
        type: Sequelize.TEXT,
      },
      appointment_type: {
        type: Sequelize.STRING,
      },
      lead_type: {
        type: Sequelize.STRING,
      },
      time_slot: {
        type: Sequelize.STRING,
      },
      referred_by: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.TEXT,
      },
      remark: {
        type: Sequelize.TEXT,
      },
      consultation_fees: {
        type: Sequelize.FLOAT,
      },
      registration_fees: {
        type: Sequelize.FLOAT,
      },
      discount: {
        type: Sequelize.FLOAT,
      },
      collected_amount: {
        type: Sequelize.FLOAT,
      },
      pending_amount: {
        type: Sequelize.FLOAT,
      },
      payment_mode: {
        type: Sequelize.STRING,
      },
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Opds');
  },
};
