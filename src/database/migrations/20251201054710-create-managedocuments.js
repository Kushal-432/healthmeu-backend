'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('managedocuments', {
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
      prefix_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      document_type: {
        type: Sequelize.ENUM('IPD Registration', 'Product Bill/Invoice'),
        allowNull: false,
      },
      prefix_status: {
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
    await queryInterface.dropTable('managedocuments');
  },
};
