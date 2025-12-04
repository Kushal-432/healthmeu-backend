'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appointments', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      clinic_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      doctor_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Doctors',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },

      appointment_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      mobile_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      patient_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      visit_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      time_slot: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      health_concern: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      referred_by: {
        type: Sequelize.STRING,
        allowNull: true,
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

  async down(queryInterface) {
    await queryInterface.dropTable('appointments');
  },
};
