'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clinic_header_footers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      clinic_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      header_image: {
        type: Sequelize.STRING,
      },
      header_margin: {
        type: Sequelize.FLOAT,
      },
      footer_image: {
        type: Sequelize.STRING,
      },
      footer_margin: {
        type: Sequelize.FLOAT,
      },
      doctor_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Doctors',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      top_margin: {
        type: Sequelize.FLOAT,
      },
      bottom_margin: {
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
    await queryInterface.dropTable('clinic_header_footers');
  },
};
