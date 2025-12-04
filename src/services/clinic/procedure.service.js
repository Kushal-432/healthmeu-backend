const { Procedure } = require('../../database/models');

// ➕ Create Procedure (clinic wise)
exports.createProcedure = async (data) => {
  return await Procedure.create(data);
};

// 📋 Get All Procedures - Clinic Wise
exports.getAllProcedures = async (clinic_id) => {
  return await Procedure.findAll({
    where: { clinic_id },
    order: [['id', 'DESC']],
  });
};

// 🔍 Get Single Procedure (clinic wise)
exports.getProcedureById = async (id, clinic_id) => {
  return await Procedure.findOne({
    where: { id, clinic_id },
  });
};

// ✏️ Update Procedure (clinic wise)
exports.updateProcedure = async (id, clinic_id, data) => {
  return await Procedure.update(data, {
    where: { id, clinic_id },
  });
};

// 🗑️ Delete Procedure (clinic wise)
exports.deleteProcedure = async (id, clinic_id) => {
  return await Procedure.destroy({
    where: { id, clinic_id },
  });
};
