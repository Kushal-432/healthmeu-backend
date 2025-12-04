'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    static associate(models) {
      // define association here (if needed later)
    }

    async comparePassword(password) {
      return await bcrypt.compare(password, this.password);
    }
  }

  Doctor.init(
    {
      clinic_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      doctor_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobile_no: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alternative_mobile_no: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: { isEmail: true },
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      signature: {
        type: DataTypes.STRING, // file path
        allowNull: true,
      },
      licence_no: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      speciality: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      qualification: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      consultation_fees: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      followup_fees: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Doctor',
      tableName: 'doctors',
      timestamps: true,

      hooks: {
        beforeCreate: async (doctor, options) => {
          const salt = await bcrypt.genSalt(10);
          doctor.password = await bcrypt.hash(doctor.password, salt);
        },
        beforeUpdate: async (doctor, options) => {
          if (doctor.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            doctor.password = await bcrypt.hash(doctor.password, salt);
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

  return Doctor;
};
