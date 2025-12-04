'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('manageprescriptions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      clinic_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Clinics', // Table name in database
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      top_margin: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      left_margin: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      right_margin: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      bottom_margin: {
        type: Sequelize.FLOAT,
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
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('manageprescriptions');
  },
};
