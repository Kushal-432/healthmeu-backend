const { Manageservice } = require('../../database/models');

// -------------------------------------------------------
// CREATE Manageservice (CLINIC-WISE)
// -------------------------------------------------------
exports.createManageservice = async (data) => {
  return await Manageservice.create(data); // data must include clinic_id
};

// -------------------------------------------------------
// GET ALL Manageservice (CLINIC-WISE)
// -------------------------------------------------------
exports.getAllManageservices = async (clinic_id) => {
  return await Manageservice.findAll({
    where: { clinic_id },
    order: [['id', 'DESC']],
  });
};

// -------------------------------------------------------
// GET SINGLE Manageservice (CLINIC-WISE)
// -------------------------------------------------------
exports.getManageserviceById = async (id, clinic_id) => {
  return await Manageservice.findOne({
    where: { id, clinic_id },
  });
};

// -------------------------------------------------------
// UPDATE Manageservice (CLINIC-WISE)
// -------------------------------------------------------
exports.updateManageservice = async (id, clinic_id, data) => {
  const record = await Manageservice.findOne({
    where: { id, clinic_id },
  });

  if (!record) return null;

  await record.update(data);
  return record;
};

// -------------------------------------------------------
// DELETE Manageservice (CLINIC-WISE)
// -------------------------------------------------------
exports.deleteManageservice = async (id, clinic_id) => {
  return await Manageservice.destroy({
    where: { id, clinic_id },
  });
};
