const vitalmasterService = require('../../services/clinic/vitalmaster.service');
const { vitalmasterValidator } = require('../../validators/clinic/vitalmaster.validator');
const { successResponse, errorResponse } = require('../../utils/response/response');

// -------------------------------------------------------
// CREATE VITALMASTER (CLINIC-WISE)
// -------------------------------------------------------
exports.createVitalmaster = async (req, res) => {
  try {
    const { error } = vitalmasterValidator.validate(req.body);
    if (error) return errorResponse(res, error.details[0].message);

    const data = { ...req.body, clinic_id: req.user.id };

    const record = await vitalmasterService.createVitalmaster(data);
    return successResponse(res, record, 'Vital parameter added successfully');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// -------------------------------------------------------
// GET ALL VITALMASTERS (CLINIC-WISE)
// -------------------------------------------------------
exports.getAllVitalmasters = async (req, res) => {
  try {
    const clinic_id = req.user.id;

    const records = await vitalmasterService.getAllVitalmasters(clinic_id);
    return successResponse(res, records);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// -------------------------------------------------------
// GET SINGLE VITALMASTER (CLINIC-WISE)
// -------------------------------------------------------
exports.getVitalmasterById = async (req, res) => {
  try {
    const clinic_id = req.user.id;
    const { id } = req.params;

    const record = await vitalmasterService.getVitalmasterById(id, clinic_id);
    if (!record) return errorResponse(res, 'Vital parameter not found', 404);

    return successResponse(res, record);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// -------------------------------------------------------
// UPDATE VITALMASTER (CLINIC-WISE)
// -------------------------------------------------------
exports.updateVitalmaster = async (req, res) => {
  try {
    const { error } = vitalmasterValidator.validate(req.body);
    if (error) return errorResponse(res, error.details[0].message);

    const clinic_id = req.user.id;
    const { id } = req.params;

    const updated = await vitalmasterService.updateVitalmaster(id, clinic_id, req.body);

    if (!updated) return errorResponse(res, 'Vital parameter not found', 404);

    return successResponse(res, updated, 'Vital parameter updated successfully');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// -------------------------------------------------------
// DELETE VITALMASTER (CLINIC-WISE)
// -------------------------------------------------------
exports.deleteVitalmaster = async (req, res) => {
  try {
    const clinic_id = req.user.id;
    const { id } = req.params;

    const deleted = await vitalmasterService.deleteVitalmaster(id, clinic_id);

    if (!deleted) return errorResponse(res, 'Vital parameter not found', 404);

    return successResponse(res, null, 'Vital parameter deleted successfully');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};
