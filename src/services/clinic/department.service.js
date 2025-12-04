const { Department } = require('../../database/models');

// ➕ Create Department (clinic wise)
exports.createDepartment = async (data) => {
  return await Department.create(data);
};

// 📋 Get All Departments - Clinic Wise
exports.getAllDepartments = async (clinic_id) => {
  return await Department.findAll({
    where: { clinic_id },
    order: [['id', 'DESC']],
  });
};

// 🔍 Get Single Department (clinic wise)
exports.getDepartmentById = async (id, clinic_id) => {
  return await Department.findOne({
    where: { id, clinic_id },
  });
};

// ✏️ Update Department (clinic wise)
exports.updateDepartment = async (id, clinic_id, data) => {
  return await Department.update(data, {
    where: { id, clinic_id },
  });
};

// 🗑️ Delete Department (clinic wise)
exports.deleteDepartment = async (id, clinic_id) => {
  return await Department.destroy({
    where: { id, clinic_id },
  });
};
