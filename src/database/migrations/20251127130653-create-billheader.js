'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('billheaders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      clinic_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clinics',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      clinic_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gst: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bill_header_for: {
        type: Sequelize.ENUM('Pharmacy', 'Pathomeu', 'Hospital'),
        allowNull: false,
      },
      mobile_no: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      establishment_no: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      margin_header: {
        type: Sequelize.FLOAT,
        allowNull: true,
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('billheaders');
  },
};
