'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('staffs', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      mobile_no: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      joining_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },

      aadhar: {
        type: Sequelize.STRING, // file path
        allowNull: true,
      },

      dob: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },

      designation: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },

      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      salary: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },

      address: {
        type: Sequelize.TEXT,
        allowNull: true,
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

  async down(queryInterface) {
    await queryInterface.dropTable('staffs');
  },
};
