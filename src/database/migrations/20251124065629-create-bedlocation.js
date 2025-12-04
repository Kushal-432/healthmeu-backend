'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bedlocations', {
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
      bed_location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      floor_no: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      wing: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('bedlocations');
  },
};
