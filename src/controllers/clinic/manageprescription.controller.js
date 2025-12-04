const managePrescriptionService = require('../../services/clinic/manageprescription.service');
const {
  managePrescriptionValidator,
} = require('../../validators/clinic/manageprescription.validator');
const { successResponse, errorResponse } = require('../../utils/response/response');

// ---------------------------------------------------
// CREATE (CLINIC-WISE)
// ---------------------------------------------------
exports.createManagePrescription = async (req, res) => {
  try {
    const { error } = managePrescriptionValidator.validate(req.body);
    if (error) return errorResponse(res, error, error.details[0].message, 400);

    const clinic_id = req.user.id;

    const created = await managePrescriptionService.createManagePrescription({
      ...req.body,
      clinic_id,
    });

    return successResponse(res, created, 'Prescription margins created successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error creating prescription margins', 500);
  }
};

// ---------------------------------------------------
// GET ALL (CLINIC-WISE)
// ---------------------------------------------------
exports.getManagePrescription = async (req, res) => {
  try {
    const clinic_id = req.user.id;

    const data = await managePrescriptionService.getManagePrescription(clinic_id);

    return successResponse(res, data, 'Prescription margins fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching prescription margins', 500);
  }
};

// ---------------------------------------------------
// GET SINGLE BY ID (CLINIC-WISE)
// ---------------------------------------------------
exports.getSingleManagePrescription = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const record = await managePrescriptionService.getManagePrescriptionById(id, clinic_id);

    if (!record) return errorResponse(res, null, 'Record not found', 404);

    return successResponse(res, record, 'Prescription margin fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching prescription margin', 500);
  }
};

// ---------------------------------------------------
// UPDATE (CLINIC-WISE)
// ---------------------------------------------------
exports.updateManagePrescription = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await managePrescriptionService.getManagePrescriptionById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'Record not found', 404);

    const { error } = managePrescriptionValidator.validate(req.body);
    if (error) return errorResponse(res, error, error.details[0].message, 400);

    const updated = await managePrescriptionService.updateManagePrescription(
      id,
      clinic_id,
      req.body
    );

    return successResponse(res, updated, 'Prescription margins updated successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error updating prescription margins', 500);
  }
};

// ---------------------------------------------------
// DELETE (CLINIC-WISE)
// ---------------------------------------------------
exports.deleteManagePrescription = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await managePrescriptionService.getManagePrescriptionById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'Record not found', 404);

    await managePrescriptionService.deleteManagePrescription(id, clinic_id);

    return successResponse(res, null, 'Prescription margins deleted successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error deleting prescription margins', 500);
  }
};
