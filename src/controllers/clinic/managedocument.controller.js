const managedocumentService = require('../../services/clinic/managedocument.service');
const { managedocumentValidator } = require('../../validators/clinic/managedocument.validator');
const { successResponse, errorResponse } = require('../../utils/response/response');

// -------------------------------------------------------
// CREATE MANAGEDOCUMENT (CLINIC-WISE)
// -------------------------------------------------------
exports.createManagedocument = async (req, res) => {
  try {
    const { error } = managedocumentValidator.validate(req.body);
    if (error) return errorResponse(res, error.details[0].message);

    const data = { ...req.body, clinic_id: req.user.id };

    const record = await managedocumentService.createManagedocument(data);
    return successResponse(res, record, 'Document prefix added successfully');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// -------------------------------------------------------
// GET ALL MANAGEDOCUMENTS (CLINIC-WISE)
// -------------------------------------------------------
exports.getAllManagedocuments = async (req, res) => {
  try {
    const clinic_id = req.user.id;
    const records = await managedocumentService.getAllManagedocuments(clinic_id);

    return successResponse(res, records);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// -------------------------------------------------------
// GET SINGLE MANAGEDOCUMENT (CLINIC-WISE)
// -------------------------------------------------------
exports.getManagedocumentById = async (req, res) => {
  try {
    const clinic_id = req.user.id;
    const { id } = req.params;

    const record = await managedocumentService.getManagedocumentById(id, clinic_id);
    if (!record) return errorResponse(res, 'Document prefix not found', 404);

    return successResponse(res, record);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// -------------------------------------------------------
// UPDATE MANAGEDOCUMENT (CLINIC-WISE)
// -------------------------------------------------------
exports.updateManagedocument = async (req, res) => {
  try {
    const { error } = managedocumentValidator.validate(req.body);
    if (error) return errorResponse(res, error.details[0].message);

    const clinic_id = req.user.id;
    const { id } = req.params;

    const updated = await managedocumentService.updateManagedocument(id, clinic_id, req.body);

    if (!updated) return errorResponse(res, 'Document prefix not found', 404);

    return successResponse(res, updated, 'Document prefix updated successfully');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// -------------------------------------------------------
// DELETE MANAGEDOCUMENT (CLINIC-WISE)
// -------------------------------------------------------
exports.deleteManagedocument = async (req, res) => {
  try {
    const clinic_id = req.user.id;
    const { id } = req.params;

    const deleted = await managedocumentService.deleteManagedocument(id, clinic_id);

    if (!deleted) return errorResponse(res, 'Document prefix not found', 404);

    return successResponse(res, null, 'Document prefix deleted successfully');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};
