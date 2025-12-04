'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tpas', {
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
      name_of_insurer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      head_office: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gst_no_cin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      registration_no: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tpas');
  },
};
