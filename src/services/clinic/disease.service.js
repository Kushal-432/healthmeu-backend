const { Disease } = require('../../database/models');

// -------------------------------------------------------
// CREATE DISEASE (CLINIC-WISE)
// -------------------------------------------------------
exports.createDisease = async (data) => {
  return await Disease.create(data);
  // data must include clinic_id
};

// -------------------------------------------------------
// GET ALL DISEASES (CLINIC-WISE)
// -------------------------------------------------------
exports.getAllDisease = async (clinic_id) => {
  return await Disease.findAll({
    where: { clinic_id },
    order: [['id', 'DESC']],
  });
};

// -------------------------------------------------------
// GET SINGLE DISEASE BY ID (CLINIC-WISE)
// -------------------------------------------------------
exports.getDiseaseById = async (id, clinic_id) => {
  return await Disease.findOne({
    where: { id, clinic_id },
  });
};

// -------------------------------------------------------
// UPDATE DISEASE (CLINIC-WISE)
// -------------------------------------------------------
exports.updateDisease = async (id, clinic_id, data) => {
  const record = await Disease.findOne({
    where: { id, clinic_id },
  });

  if (!record) return null;

  await record.update(data);
  return record;
};

// -------------------------------------------------------
// DELETE DISEASE (CLINIC-WISE)
// -------------------------------------------------------
exports.deleteDisease = async (id, clinic_id) => {
  return await Disease.destroy({
    where: { id, clinic_id },
  });
};
