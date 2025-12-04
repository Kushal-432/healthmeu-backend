'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    static associate(models) {
      // define associations later if needed
    }

    async comparePassword(password) {
      return await bcrypt.compare(password, this.password);
    }
  }

  Staff.init(
    {
      clinic_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobile_no: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      joining_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      aadhar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      designation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: { isEmail: true },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salary: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Staff',
      tableName: 'staffs',

      hooks: {
        async beforeCreate(staff) {
          const salt = await bcrypt.genSalt(10);
          staff.password = await bcrypt.hash(staff.password, salt);
        },

        async beforeUpdate(staff) {
          if (staff.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            staff.password = await bcrypt.hash(staff.password, salt);
          }
        },
      },

      defaultScope: {
        attributes: { exclude: ['password'] },
      },

      scopes: {
        withPassword: {
          attributes: {},
        },
      },
    }
  );

  return Staff;
};
