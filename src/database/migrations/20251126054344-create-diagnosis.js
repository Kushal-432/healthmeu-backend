'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('diagnoses', {
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
      diagnosis_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      diagnosis_details: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('diagnoses');
  },
};
