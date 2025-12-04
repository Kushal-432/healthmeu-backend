'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bedmanages', {
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
      bed_no: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      daily_rate: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      bedtype_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'bedtypes',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      bedlocation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'bedlocations',
          key: 'id',
        },
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('bedmanages');
  },
};
