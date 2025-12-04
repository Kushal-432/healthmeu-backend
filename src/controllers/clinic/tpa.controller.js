const tpaService = require('../../services/clinic/tpa.service');
const { tpaValidator } = require('../../validators/clinic/tpa.validator');
const { successResponse, errorResponse } = require('../../utils/response/response');

// ---------------------------------------------------
// CREATE TPA (CLINIC-WISE)
// ---------------------------------------------------
exports.createTPA = async (req, res) => {
  try {
    const clinic_id = req.user.id;

    // Attach clinic_id to request body
    req.body.clinic_id = clinic_id;

    const { error } = tpaValidator.validate(req.body);
    if (error) return errorResponse(res, error, error.details[0].message, 400);

    const created = await tpaService.createTPA(req.body);

    return successResponse(res, created, 'TPA created successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error creating TPA', 500);
  }
};

// ---------------------------------------------------
// GET ALL TPA (CLINIC-WISE)
// ---------------------------------------------------
exports.getAllTPA = async (req, res) => {
  try {
    const clinic_id = req.user.id;

    const tpaList = await tpaService.getAllTPA(clinic_id);

    return successResponse(res, tpaList, 'TPA list fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching TPA list', 500);
  }
};

// ---------------------------------------------------
// GET SINGLE TPA BY ID (CLINIC-WISE)
// ---------------------------------------------------
exports.getTPAById = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const tpa = await tpaService.getTPAById(id, clinic_id);
    if (!tpa) return errorResponse(res, null, 'TPA not found', 404);

    return successResponse(res, tpa, 'TPA fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching TPA', 500);
  }
};

// ---------------------------------------------------
// UPDATE TPA (CLINIC-WISE)
// ---------------------------------------------------
exports.updateTPA = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await tpaService.getTPAById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'TPA not found', 404);

    req.body.clinic_id = clinic_id;

    const { error } = tpaValidator.validate(req.body, { allowUnknown: true });
    if (error) return errorResponse(res, error, error.details[0].message, 400);

    const updated = await tpaService.updateTPA(id, clinic_id, req.body);

    return successResponse(res, updated, 'TPA updated successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error updating TPA', 500);
  }
};

// ---------------------------------------------------
// DELETE TPA (CLINIC-WISE)
// ---------------------------------------------------
exports.deleteTPA = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await tpaService.getTPAById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'TPA not found', 404);

    await tpaService.deleteTPA(id, clinic_id);

    return successResponse(res, null, 'TPA deleted successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error deleting TPA', 500);
  }
};
