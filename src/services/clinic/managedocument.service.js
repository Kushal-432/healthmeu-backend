const { Managedocument } = require('../../database/models');

// -------------------------------------------------------
// CREATE Managedocument (CLINIC-WISE)
// -------------------------------------------------------
exports.createManagedocument = async (data) => {
  return await Managedocument.create(data); // data must include clinic_id
};

// -------------------------------------------------------
// GET ALL Managedocument (CLINIC-WISE)
// -------------------------------------------------------
exports.getAllManagedocuments = async (clinic_id) => {
  return await Managedocument.findAll({
    where: { clinic_id },
    order: [['id', 'DESC']],
  });
};

// -------------------------------------------------------
// GET SINGLE Managedocument (CLINIC-WISE)
// -------------------------------------------------------
exports.getManagedocumentById = async (id, clinic_id) => {
  return await Managedocument.findOne({
    where: { id, clinic_id },
  });
};

// -------------------------------------------------------
// UPDATE Managedocument (CLINIC-WISE)
// -------------------------------------------------------
exports.updateManagedocument = async (id, clinic_id, data) => {
  const record = await Managedocument.findOne({
    where: { id, clinic_id },
  });

  if (!record) return null;

  await record.update(data);
  return record;
};

// -------------------------------------------------------
// DELETE Managedocument (CLINIC-WISE)
// -------------------------------------------------------
exports.deleteManagedocument = async (id, clinic_id) => {
  return await Managedocument.destroy({
    where: { id, clinic_id },
  });
};
