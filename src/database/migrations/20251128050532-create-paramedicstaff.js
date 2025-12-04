'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('paramedic_staff', {
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

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      designation: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      mobile_no: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      joining_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },

      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      adhar: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      dob: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },

      salary: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },

      address: {
        type: Sequelize.TEXT,
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('paramedic_staff');
  },
};
