const { Paramedicstaff } = require('../../database/models');

// -------------------------------------------------------
// CREATE PARAMEDIC STAFF (CLINIC-WISE)
// -------------------------------------------------------
exports.createParamedicStaff = async (data) => {
  return await Paramedicstaff.create(data);
  // data must include clinic_id
};

// -------------------------------------------------------
// GET ALL PARAMEDIC STAFF (CLINIC-WISE)
// -------------------------------------------------------
exports.getAllParamedicStaff = async (clinic_id) => {
  return await Paramedicstaff.findAll({
    where: { clinic_id },
    order: [['id', 'DESC']],
  });
};

// -------------------------------------------------------
// GET SINGLE PARAMEDIC STAFF (CLINIC-WISE)
// -------------------------------------------------------
exports.getParamedicStaffById = async (id, clinic_id) => {
  return await Paramedicstaff.findOne({
    where: { id, clinic_id },
  });
};

// -------------------------------------------------------
// UPDATE PARAMEDIC STAFF (CLINIC-WISE)
// -------------------------------------------------------
exports.updateParamedicStaff = async (id, clinic_id, data) => {
  const record = await Paramedicstaff.findOne({
    where: { id, clinic_id },
  });

  if (!record) return null;

  await record.update(data);
  return record;
};

// -------------------------------------------------------
// DELETE PARAMEDIC STAFF (CLINIC-WISE)
// -------------------------------------------------------
exports.deleteParamedicStaff = async (id, clinic_id) => {
  return await Paramedicstaff.destroy({
    where: { id, clinic_id },
  });
};
