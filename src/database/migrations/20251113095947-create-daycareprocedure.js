'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DaycareProcedures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      daycare_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Daycares',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      procedure_name: {
        type: Sequelize.STRING,
      },
      qty: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('DaycareProcedures');
  },
};
