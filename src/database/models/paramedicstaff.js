'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Paramedicstaff extends Model {
    static associate(models) {
      Paramedicstaff.belongsTo(models.Clinic, {
        foreignKey: 'clinic_id',
        as: 'clinic',
      });
    }

    async comparePassword(password) {
      return await bcrypt.compare(password, this.password);
    }
  }

  Paramedicstaff.init(
    {
      clinic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      designation: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      mobile_no: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: { isEmail: true },
      },

      joining_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
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

      aadhar: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      dob: {
        type: DataTypes.DATEONLY,
        allowNull: true,
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
      modelName: 'Paramedicstaff',
      tableName: 'paramedic_staff',

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

  return Paramedicstaff;
};
