const { Diagnosis } = require('../../database/models');

// -----------------------------------------
// CREATE Diagnosis (Clinic Wise)
// -----------------------------------------
exports.createDiagnosis = async (data) => {
  return await Diagnosis.create(data);
};

// -----------------------------------------
// GET ALL Diagnosis (Clinic Wise)
// -----------------------------------------
exports.getAllDiagnosis = async (clinic_id) => {
  return await Diagnosis.findAll({
    where: { clinic_id },
    order: [['id', 'DESC']],
  });
};

// -----------------------------------------
// GET SINGLE Diagnosis BY ID (Clinic Wise)
// -----------------------------------------
exports.getDiagnosisById = async (id, clinic_id) => {
  return await Diagnosis.findOne({
    where: { id, clinic_id },
  });
};

// -----------------------------------------
// UPDATE Diagnosis (Clinic Wise)
// -----------------------------------------
exports.updateDiagnosis = async (id, clinic_id, data) => {
  return await Diagnosis.update(data, {
    where: { id, clinic_id },
  });
};

// -----------------------------------------
// DELETE Diagnosis (Clinic Wise)
// -----------------------------------------
exports.deleteDiagnosis = async (id, clinic_id) => {
  return await Diagnosis.destroy({
    where: { id, clinic_id },
  });
};
