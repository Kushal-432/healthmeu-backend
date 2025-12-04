const { Referer } = require('../../database/models');

// -------------------------------------------------------
// CREATE REFERER (CLINIC-WISE)
// -------------------------------------------------------
exports.createReferer = async (data) => {
  return await Referer.create(data);
  // data must include clinic_id
};

// -------------------------------------------------------
// GET ALL REFERERS (CLINIC-WISE)
// -------------------------------------------------------
exports.getAllReferers = async (clinic_id) => {
  return await Referer.findAll({
    where: { clinic_id },
    order: [['id', 'DESC']],
  });
};

// -------------------------------------------------------
// GET SINGLE REFERER (CLINIC-WISE)
// -------------------------------------------------------
exports.getRefererById = async (id, clinic_id) => {
  return await Referer.findOne({
    where: { id, clinic_id },
  });
};

// -------------------------------------------------------
// UPDATE REFERER (CLINIC-WISE)
// -------------------------------------------------------
exports.updateReferer = async (id, clinic_id, data) => {
  const record = await Referer.findOne({
    where: { id, clinic_id },
  });

  if (!record) return null;

  await record.update(data);
  return record;
};

// -------------------------------------------------------
// DELETE REFERER (CLINIC-WISE)
// -------------------------------------------------------
exports.deleteReferer = async (id, clinic_id) => {
  return await Referer.destroy({
    where: { id, clinic_id },
  });
};
