'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('doctors', {
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
      doctor_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      mobile_no: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      alternative_mobile_no: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },

      address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      signature: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      licence_no: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      department: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      speciality: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      qualification: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      consultation_fees: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },

      followup_fees: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('doctors');
  },
};
