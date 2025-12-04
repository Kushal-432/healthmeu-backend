const diagnosisService = require('../../services/clinic/diagnosis.service');
const { diagnosisValidator } = require('../../validators/clinic/diagnosis.validator');
const { successResponse, errorResponse } = require('../../utils/response/response');

// -------------------------------------------------------
// CREATE DIAGNOSIS (CLINIC WISE)
// -------------------------------------------------------
exports.createDiagnosis = async (req, res) => {
  try {
    const clinic_id = req.user.id; // clinic id from logged-in user
    console.log('Logged-in Clinic ID:', req.user.id);

    // Validate
    const { error } = diagnosisValidator.validate(req.body);
    if (error) {
      return errorResponse(res, error, error.details[0].message, 400);
    }

    const payload = { ...req.body, clinic_id };

    const diagnosis = await diagnosisService.createDiagnosis(payload);

    return successResponse(res, diagnosis, 'Diagnosis created successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error creating Diagnosis', 500);
  }
};

// -------------------------------------------------------
// GET ALL DIAGNOSIS (CLINIC WISE)
// -------------------------------------------------------
exports.getAllDiagnosis = async (req, res) => {
  try {
    const clinic_id = req.user.id;

    const list = await diagnosisService.getAllDiagnosis(clinic_id);

    return successResponse(res, list, 'Diagnosis fetched successfully', 200);
  } catch (err) {
    console.error('🔥 ERROR in getAllDiagnosis:', err);
    return errorResponse(res, err, 'Error fetching Diagnosis list', 500);
  }
};

// -------------------------------------------------------
// GET SINGLE DIAGNOSIS (CLINIC WISE)
// -------------------------------------------------------
exports.getDiagnosisById = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const diagnosis = await diagnosisService.getDiagnosisById(id, clinic_id);

    if (!diagnosis) return errorResponse(res, null, 'Diagnosis not found', 404);

    return successResponse(res, diagnosis, 'Diagnosis fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching Diagnosis', 500);
  }
};

// -------------------------------------------------------
// UPDATE DIAGNOSIS (CLINIC WISE)
// -------------------------------------------------------
exports.updateDiagnosis = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    // Check if exists for this clinic
    const existing = await diagnosisService.getDiagnosisById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'Diagnosis not found', 404);

    // Validate input
    const { error } = diagnosisValidator.validate(req.body);
    if (error) {
      return errorResponse(res, error, error.details[0].message, 400);
    }

    const updated = await diagnosisService.updateDiagnosis(id, clinic_id, req.body);

    return successResponse(res, updated, 'Diagnosis updated successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error updating Diagnosis', 500);
  }
};

// -------------------------------------------------------
// DELETE DIAGNOSIS (CLINIC WISE)
// -------------------------------------------------------
exports.deleteDiagnosis = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await diagnosisService.getDiagnosisById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'Diagnosis not found', 404);

    await diagnosisService.deleteDiagnosis(id, clinic_id);

    return successResponse(res, null, 'Diagnosis deleted successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error deleting Diagnosis', 500);
  }
};
