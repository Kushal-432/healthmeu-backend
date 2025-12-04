'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vitalmasters', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      clinic_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      parameter_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      parameter_unit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      parameter_status: {
        type: Sequelize.ENUM('Active', 'In-Active'),
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('vitalmasters');
  },
};
