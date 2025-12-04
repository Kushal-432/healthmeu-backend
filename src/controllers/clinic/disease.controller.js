const diseaseService = require('../../services/clinic/disease.service');
const { diseaseValidator } = require('../../validators/clinic/disease.validator');
const { successResponse, errorResponse } = require('../../utils/response/response');

// -------------------------------------------------------
// CREATE DISEASE (CLINIC-WISE)
// -------------------------------------------------------
exports.createDisease = async (req, res) => {
  try {
    const { error } = diseaseValidator.validate(req.body);
    if (error) return errorResponse(res, error, error.details[0].message, 400);

    const clinic_id = req.user.id;

    const created = await diseaseService.createDisease({
      ...req.body,
      clinic_id,
    });

    return successResponse(res, created, 'Disease created successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error creating Disease', 500);
  }
};

// -------------------------------------------------------
// GET ALL DISEASE (CLINIC-WISE)
// -------------------------------------------------------
exports.getAllDisease = async (req, res) => {
  try {
    const clinic_id = req.user.id;

    const list = await diseaseService.getAllDisease(clinic_id);

    return successResponse(res, list, 'Disease fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching Disease list', 500);
  }
};

// -------------------------------------------------------
// GET SINGLE DISEASE (CLINIC-WISE)
// -------------------------------------------------------
exports.getDiseaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const disease = await diseaseService.getDiseaseById(id, clinic_id);

    if (!disease) return errorResponse(res, null, 'Disease not found', 404);

    return successResponse(res, disease, 'Disease fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching Disease', 500);
  }
};

// -------------------------------------------------------
// UPDATE DISEASE (CLINIC-WISE)
// -------------------------------------------------------
exports.updateDisease = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await diseaseService.getDiseaseById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'Disease not found', 404);

    const { error } = diseaseValidator.validate(req.body);
    if (error) return errorResponse(res, error, error.details[0].message, 400);

    const updated = await diseaseService.updateDisease(id, clinic_id, req.body);

    return successResponse(res, updated, 'Disease updated successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error updating Disease', 500);
  }
};

// -------------------------------------------------------
// DELETE DISEASE (CLINIC-WISE)
// -------------------------------------------------------
exports.deleteDisease = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await diseaseService.getDiseaseById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'Disease not found', 404);

    await diseaseService.deleteDisease(id, clinic_id);

    return successResponse(res, null, 'Disease deleted successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error deleting Disease', 500);
  }
};
