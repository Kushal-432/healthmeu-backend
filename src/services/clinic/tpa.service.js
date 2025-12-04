const { Tpa } = require('../../database/models');

// -------------------------------------------------------
// CREATE TPA (CLINIC-WISE)
// -------------------------------------------------------
exports.createTPA = async (data) => {
  return await Tpa.create(data); // data must include clinic_id
};

// -------------------------------------------------------
// GET ALL TPA (CLINIC-WISE)
// -------------------------------------------------------
exports.getAllTPA = async (clinic_id) => {
  return await Tpa.findAll({
    where: { clinic_id },
    order: [['id', 'DESC']],
  });
};

// -------------------------------------------------------
// GET SINGLE TPA (CLINIC-WISE)
// -------------------------------------------------------
exports.getTPAById = async (id, clinic_id) => {
  return await Tpa.findOne({
    where: { id, clinic_id },
  });
};

// -------------------------------------------------------
// UPDATE TPA (CLINIC-WISE)
// -------------------------------------------------------
exports.updateTPA = async (id, clinic_id, data) => {
  const record = await Tpa.findOne({
    where: { id, clinic_id },
  });

  if (!record) return null;

  await record.update(data);
  return record;
};

// -------------------------------------------------------
// DELETE TPA (CLINIC-WISE)
// -------------------------------------------------------
exports.deleteTPA = async (id, clinic_id) => {
  return await Tpa.destroy({
    where: { id, clinic_id },
  });
};
