const { Surgerytype } = require('../../database/models');

// -------------------------------------------------------
// CREATE Surgerytype (CLINIC-WISE)
// -------------------------------------------------------
exports.createSurgerytype = async (data) => {
  return await Surgerytype.create(data); // data must include clinic_id
};

// -------------------------------------------------------
// GET ALL Surgerytypes (CLINIC-WISE)
// -------------------------------------------------------
exports.getAllSurgerytypes = async (clinic_id) => {
  return await Surgerytype.findAll({
    where: { clinic_id },
    order: [['id', 'DESC']],
  });
};

// -------------------------------------------------------
// GET SINGLE Surgerytype (CLINIC-WISE)
// -------------------------------------------------------
exports.getSurgerytypeById = async (id, clinic_id) => {
  return await Surgerytype.findOne({
    where: { id, clinic_id },
  });
};

// -------------------------------------------------------
// UPDATE Surgerytype (CLINIC-WISE)
// -------------------------------------------------------
exports.updateSurgerytype = async (id, clinic_id, data) => {
  const record = await Surgerytype.findOne({
    where: { id, clinic_id },
  });

  if (!record) return null;

  await record.update(data);
  return record;
};

// -------------------------------------------------------
// DELETE Surgerytype (CLINIC-WISE)
// -------------------------------------------------------
exports.deleteSurgerytype = async (id, clinic_id) => {
  return await Surgerytype.destroy({
    where: { id, clinic_id },
  });
};
