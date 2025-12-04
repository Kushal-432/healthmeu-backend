'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bedtypes', {
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

      bed_type_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      base_price: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('bedtypes');
  },
};
