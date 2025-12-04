'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('birthregistrations', {
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

      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      reg_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      time: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      baby_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      doctor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      age: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      blood_group: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      sdwo_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      dob: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      mobile: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      length_cm: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },

      weight_kg: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },

      head_circumference_cm: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },

      birth_type: {
        type: Sequelize.ENUM('Normal', 'Caesarean', 'Forceps'),
        allowNull: false,
      },

      btn_register: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      gender: {
        type: Sequelize.ENUM('Male', 'Female'),
        allowNull: false,
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
    await queryInterface.dropTable('birthregistrations');
  },
};
