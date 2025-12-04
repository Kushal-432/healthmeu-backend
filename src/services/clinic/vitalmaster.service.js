const { Vitalmaster } = require('../../database/models');

// -------------------------------------------------------
// CREATE Vitalmaster (CLINIC-WISE)
// -------------------------------------------------------
exports.createVitalmaster = async (data) => {
  return await Vitalmaster.create(data); // data must include clinic_id
};

// -------------------------------------------------------
// GET ALL Vitalmasters (CLINIC-WISE)
// -------------------------------------------------------
exports.getAllVitalmasters = async (clinic_id) => {
  return await Vitalmaster.findAll({
    where: { clinic_id },
    order: [['id', 'DESC']],
  });
};

// -------------------------------------------------------
// GET SINGLE Vitalmaster (CLINIC-WISE)
// -------------------------------------------------------
exports.getVitalmasterById = async (id, clinic_id) => {
  return await Vitalmaster.findOne({
    where: { id, clinic_id },
  });
};

// -------------------------------------------------------
// UPDATE Vitalmaster (CLINIC-WISE)
// -------------------------------------------------------
exports.updateVitalmaster = async (id, clinic_id, data) => {
  const record = await Vitalmaster.findOne({
    where: { id, clinic_id },
  });

  if (!record) return null;

  await record.update(data);
  return record;
};

// -------------------------------------------------------
// DELETE Vitalmaster (CLINIC-WISE)
// -------------------------------------------------------
exports.deleteVitalmaster = async (id, clinic_id) => {
  return await Vitalmaster.destroy({
    where: { id, clinic_id },
  });
};
