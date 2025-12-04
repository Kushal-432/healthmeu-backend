'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    static associate(models) {
      // Each department belongs to a clinic
      Department.belongsTo(models.Clinic, {
        foreignKey: 'clinic_id',
        as: 'clinic',
      });
    }
  }

  Department.init(
    {
      clinic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      department_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Department',
      tableName: 'departments',
      timestamps: true, // createdAt & updatedAt
    }
  );

  return Department;
};
