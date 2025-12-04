'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('diseases', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      clinic_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      disease_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      symptoms: {
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
    await queryInterface.dropTable('diseases');
  },
};
