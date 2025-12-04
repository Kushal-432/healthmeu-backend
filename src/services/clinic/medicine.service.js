const { Medicine } = require('../../database/models');

// -------------------------------------------------------
// CREATE MEDICINE (CLINIC-WISE)
// -------------------------------------------------------
exports.createMedicine = async (data) => {
  // data must include clinic_id
  return await Medicine.create(data);
};

// -------------------------------------------------------
// GET ALL MEDICINES (CLINIC-WISE)
// -------------------------------------------------------
exports.getAllMedicine = async (clinic_id) => {
  return await Medicine.findAll({
    where: { clinic_id },
    order: [['id', 'DESC']],
  });
};

// -------------------------------------------------------
// GET SINGLE MEDICINE (CLINIC-WISE)
// -------------------------------------------------------
exports.getMedicineById = async (id, clinic_id) => {
  return await Medicine.findOne({
    where: { id, clinic_id },
  });
};

// -------------------------------------------------------
// UPDATE MEDICINE (CLINIC-WISE)
// -------------------------------------------------------
exports.updateMedicine = async (id, clinic_id, data) => {
  const record = await Medicine.findOne({ where: { id, clinic_id } });
  if (!record) return null;

  await record.update(data);
  return record;
};

// -------------------------------------------------------
// DELETE MEDICINE (CLINIC-WISE)
// -------------------------------------------------------
exports.deleteMedicine = async (id, clinic_id) => {
  return await Medicine.destroy({ where: { id, clinic_id } });
};
