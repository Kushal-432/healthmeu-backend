const manageserviceService = require('../../services/clinic/manageservice.service');
const { manageserviceValidator } = require('../../validators/clinic/manageservice.validator');
const { successResponse, errorResponse } = require('../../utils/response/response');

// -------------------------------------------------------
// CREATE MANAGE SERVICE (CLINIC-WISE)
// -------------------------------------------------------
exports.createManageservice = async (req, res) => {
  try {
    const { error } = manageserviceValidator.validate(req.body);
    if (error) return errorResponse(res, error.details[0].message);

    const data = { ...req.body, clinic_id: req.user.id }; // automatically add clinic_id
    const record = await manageserviceService.createManageservice(data);

    return successResponse(res, record, 'Service added successfully');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// -------------------------------------------------------
// GET ALL SERVICES (CLINIC-WISE)
// -------------------------------------------------------
exports.getAllManageservices = async (req, res) => {
  try {
    const clinic_id = req.user.id;
    const records = await manageserviceService.getAllManageservices(clinic_id);

    return successResponse(res, records);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// -------------------------------------------------------
// GET SINGLE SERVICE (CLINIC-WISE)
// -------------------------------------------------------
exports.getManageserviceById = async (req, res) => {
  try {
    const clinic_id = req.user.id;
    const { id } = req.params;

    const record = await manageserviceService.getManageserviceById(id, clinic_id);

    if (!record) return errorResponse(res, 'Service not found', 404);

    return successResponse(res, record);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// -------------------------------------------------------
// UPDATE SERVICE (CLINIC-WISE)
// -------------------------------------------------------
exports.updateManageservice = async (req, res) => {
  try {
    const { error } = manageserviceValidator.validate(req.body);
    if (error) return errorResponse(res, error.details[0].message);

    const clinic_id = req.user.id;
    const { id } = req.params;

    const updated = await manageserviceService.updateManageservice(id, clinic_id, req.body);

    if (!updated) return errorResponse(res, 'Service not found', 404);

    return successResponse(res, updated, 'Service updated successfully');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// -------------------------------------------------------
// DELETE SERVICE (CLINIC-WISE)
// -------------------------------------------------------
exports.deleteManageservice = async (req, res) => {
  try {
    const clinic_id = req.user.id;
    const { id } = req.params;

    const deleted = await manageserviceService.deleteManageservice(id, clinic_id);

    if (!deleted) return errorResponse(res, 'Service not found', 404);

    return successResponse(res, null, 'Service deleted successfully');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};
