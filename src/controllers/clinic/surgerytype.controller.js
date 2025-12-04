const surgerytypeService = require('../../services/clinic/surgerytypes.service');
const { surgerytypeValidator } = require('../../validators/clinic/surgerytype.validator');
const { successResponse, errorResponse } = require('../../utils/response/response');

// -------------------------------------------------------
// CREATE SURGERYTYPE
// -------------------------------------------------------
exports.createSurgerytype = async (req, res) => {
  try {
    const clinic_id = req.user.id; // From token or session
    const data = { ...req.body, clinic_id };

    // Validate
    const { error } = surgerytypeValidator.validate(data);
    if (error) return errorResponse(res, error.details[0].message);

    const result = await surgerytypeService.createSurgerytype(data);
    return successResponse(res, result, 'Surgerytype created successfully');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// -------------------------------------------------------
// GET ALL SURGERYTYPES (CLINIC-WISE)
// -------------------------------------------------------
exports.getAllSurgerytypes = async (req, res) => {
  try {
    const clinic_id = req.user.id;

    const result = await surgerytypeService.getAllSurgerytypes(clinic_id);
    return successResponse(res, result);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// -------------------------------------------------------
// GET SINGLE SURGERYTYPE
// -------------------------------------------------------
exports.getSurgerytypeById = async (req, res) => {
  try {
    const clinic_id = req.user.id;
    const { id } = req.params;

    const result = await surgerytypeService.getSurgerytypeById(id, clinic_id);

    if (!result) return errorResponse(res, 'Surgerytype not found', 404);

    return successResponse(res, result);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// -------------------------------------------------------
// UPDATE SURGERYTYPE
// -------------------------------------------------------
exports.updateSurgerytype = async (req, res) => {
  try {
    const clinic_id = req.user.id;
    const { id } = req.params;
    const data = { ...req.body, clinic_id };

    // Validate
    const { error } = surgerytypeValidator.validate(data);
    if (error) return errorResponse(res, error.details[0].message);

    const result = await surgerytypeService.updateSurgerytype(id, clinic_id, data);
    if (!result) return errorResponse(res, 'Surgerytype not found', 404);

    return successResponse(res, result, 'Surgerytype updated successfully');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// -------------------------------------------------------
// DELETE SURGERYTYPE
// -------------------------------------------------------
exports.deleteSurgerytype = async (req, res) => {
  try {
    const clinic_id = req.user.id;
    const { id } = req.params;

    const result = await surgerytypeService.deleteSurgerytype(id, clinic_id);
    if (!result) return errorResponse(res, 'Surgerytype not found', 404);

    return successResponse(res, null, 'Surgerytype deleted successfully');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};
