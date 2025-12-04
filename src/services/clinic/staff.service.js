const { Staff } = require('../../database/models');

// -------------------------------------------------------
// CREATE STAFF (CLINIC-WISE)
// -------------------------------------------------------
exports.createStaff = async (data) => {
  return await Staff.create(data);
  // data must include clinic_id
};

// -------------------------------------------------------
// GET ALL STAFF (CLINIC-WISE)
// -------------------------------------------------------
exports.getAllStaff = async (clinic_id) => {
  return await Staff.findAll({
    where: { clinic_id },
    order: [['id', 'DESC']],
  });
};

// -------------------------------------------------------
// GET SINGLE STAFF (CLINIC-WISE)
// -------------------------------------------------------
exports.getStaffById = async (id, clinic_id) => {
  return await Staff.findOne({
    where: { id, clinic_id },
  });
};

// -------------------------------------------------------
// UPDATE STAFF (CLINIC-WISE)
// -------------------------------------------------------
exports.updateStaff = async (id, clinic_id, data) => {
  const record = await Staff.findOne({
    where: { id, clinic_id },
  });

  if (!record) return null;

  await record.update(data); // Password hashing auto-handled by hook
  return record;
};

// -------------------------------------------------------
// DELETE STAFF (CLINIC-WISE)
// -------------------------------------------------------
exports.deleteStaff = async (id, clinic_id) => {
  return await Staff.destroy({
    where: { id, clinic_id },
  });
};
