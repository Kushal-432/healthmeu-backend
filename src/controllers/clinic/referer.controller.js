const refererService = require('../../services/clinic/referer.service');
const { refererValidator } = require('../../validators/clinic/referer.validator');
const { successResponse, errorResponse } = require('../../utils/response/response');

// ---------------------------------------------------
// CREATE REFERER (CLINIC-WISE)
// ---------------------------------------------------
exports.createReferer = async (req, res) => {
  try {
    const clinic_id = req.user.id;

    // Attach clinic_id to body
    req.body.clinic_id = clinic_id;

    const { error } = refererValidator.validate(req.body);
    if (error) return errorResponse(res, error, error.details[0].message, 400);

    const created = await refererService.createReferer(req.body);

    return successResponse(res, created, 'Referer created successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error creating referer', 500);
  }
};

// ---------------------------------------------------
// GET ALL REFERERS (CLINIC-WISE)
// ---------------------------------------------------
exports.getAllReferers = async (req, res) => {
  try {
    const clinic_id = req.user.id;

    const data = await refererService.getAllReferers(clinic_id);

    return successResponse(res, data, 'Referers fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching referers', 500);
  }
};

// ---------------------------------------------------
// GET SINGLE REFERER BY ID (CLINIC-WISE)
// ---------------------------------------------------
exports.getRefererById = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const data = await refererService.getRefererById(id, clinic_id);

    if (!data) return errorResponse(res, null, 'Referer not found', 404);

    return successResponse(res, data, 'Referer fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching referer', 500);
  }
};

// ---------------------------------------------------
// UPDATE REFERER (CLINIC-WISE)
// ---------------------------------------------------
exports.updateReferer = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    // Check if referer exists for this clinic
    const existing = await refererService.getRefererById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'Referer not found', 404);

    // Attach clinic_id to body
    req.body.clinic_id = clinic_id;

    const { error } = refererValidator.validate(req.body, { allowUnknown: true });
    if (error) return errorResponse(res, error, error.details[0].message, 400);

    const updated = await refererService.updateReferer(id, clinic_id, req.body);

    return successResponse(res, updated, 'Referer updated successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error updating referer', 500);
  }
};

// ---------------------------------------------------
// DELETE REFERER (CLINIC-WISE)
// ---------------------------------------------------
exports.deleteReferer = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await refererService.getRefererById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'Referer not found', 404);

    await refererService.deleteReferer(id, clinic_id);

    return successResponse(res, null, 'Referer deleted successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error deleting referer', 500);
  }
};
