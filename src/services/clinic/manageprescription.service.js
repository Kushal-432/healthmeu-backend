const { Manageprescription } = require('../../database/models');

// -------------------------------------------------------
// CREATE PRESCRIPTION MANAGE
// -------------------------------------------------------
exports.createManagePrescription = async (data) => {
  return await Manageprescription.create(data);
  // data must include clinic_id
};

// -------------------------------------------------------
// GET ALL (CLINIC-WISE)
// -------------------------------------------------------
exports.getManagePrescription = async (clinic_id) => {
  return await Manageprescription.findAll({
    where: { clinic_id },
    order: [['id', 'DESC']],
  });
};

// -------------------------------------------------------
// GET SINGLE RECORD (CLINIC-WISE)
// -------------------------------------------------------
exports.getManagePrescriptionById = async (id, clinic_id) => {
  return await Manageprescription.findOne({
    where: { id, clinic_id },
  });
};

// -------------------------------------------------------
// UPDATE (CLINIC-WISE)
// -------------------------------------------------------
exports.updateManagePrescription = async (id, clinic_id, data) => {
  const record = await Manageprescription.findOne({
    where: { id, clinic_id },
  });

  if (!record) return null;

  await record.update(data);
  return record;
};

// -------------------------------------------------------
// DELETE (CLINIC-WISE)
// -------------------------------------------------------
exports.deleteManagePrescription = async (id, clinic_id) => {
  return await Manageprescription.destroy({
    where: { id, clinic_id },
  });
};
