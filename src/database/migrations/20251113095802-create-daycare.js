'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('daycares', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      clinic_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ap_id: {
        type: Sequelize.STRING,
      },
      procedure_name: {
        type: Sequelize.STRING,
      },
      appointment_date: {
        type: Sequelize.DATEONLY,
      },
      full_name: {
        type: Sequelize.STRING,
      },
      doctor: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      emergency_contact: {
        type: Sequelize.STRING,
      },
      next_visit_date: {
        type: Sequelize.DATEONLY,
      },
      email: {
        type: Sequelize.STRING,
      },
      consent_letter: {
        type: Sequelize.STRING,
      },
      item_fees: {
        type: Sequelize.FLOAT,
      },
      procedure_fees: {
        type: Sequelize.FLOAT,
      },
      other_fees: {
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
    await queryInterface.dropTable('daycares');
  },
};
