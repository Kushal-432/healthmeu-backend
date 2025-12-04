const procedureService = require('../../services/clinic/procedure.service');
const { procedureValidator } = require('../../validators/clinic/procedure.validator');
const { successResponse, errorResponse } = require('../../utils/response/response');

/*---------------------------------------------------------------------
 CREATE PROCEDURE
---------------------------------------------------------------------*/
exports.createProcedure = async (req, res) => {
  try {
    const clinic_id = req.user.id; // ⭐ Logged-in clinic ID

    const data = { clinic_id, ...req.body };

    // Validate request body
    const { error } = procedureValidator.validate(data);
    if (error) {
      return errorResponse(res, error, error.details[0].message, 400);
    }

    const created = await procedureService.createProcedure(data);
    return successResponse(res, created, 'Procedure created successfully', 200);
  } catch (err) {
    console.error('Error creating procedure:', err);
    return errorResponse(res, err, 'Error creating procedure', 500);
  }
};

/*---------------------------------------------------------------------
 GET ALL PROCEDURES (clinic-wise)
---------------------------------------------------------------------*/
exports.getAllProcedures = async (req, res) => {
  try {
    const clinic_id = req.user.id;

    const procedures = await procedureService.getAllProcedures(clinic_id);
    return successResponse(res, procedures, 'Procedures fetched successfully', 200);
  } catch (err) {
    console.error('Error fetching procedures:', err);
    return errorResponse(res, err, 'Error fetching procedures', 500);
  }
};

/*---------------------------------------------------------------------
 GET SINGLE PROCEDURE BY ID (clinic-wise)
---------------------------------------------------------------------*/
exports.getProcedureById = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const procedure = await procedureService.getProcedureById(id, clinic_id);
    if (!procedure) return errorResponse(res, null, 'Procedure not found', 404);

    return successResponse(res, procedure, 'Procedure fetched successfully', 200);
  } catch (err) {
    console.error('Error fetching procedure:', err);
    return errorResponse(res, err, 'Error fetching procedure', 500);
  }
};

/*---------------------------------------------------------------------
 UPDATE PROCEDURE (clinic-wise)
---------------------------------------------------------------------*/
exports.updateProcedure = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await procedureService.getProcedureById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'Procedure not found', 404);

    const updated = await procedureService.updateProcedure(id, clinic_id, req.body);
    return successResponse(res, updated, 'Procedure updated successfully', 200);
  } catch (err) {
    console.error('Error updating procedure:', err);
    return errorResponse(res, err, 'Error updating procedure', 500);
  }
};

/*---------------------------------------------------------------------
 DELETE PROCEDURE (clinic-wise)
---------------------------------------------------------------------*/
exports.deleteProcedure = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await procedureService.getProcedureById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'Procedure not found', 404);

    await procedureService.deleteProcedure(id, clinic_id);
    return successResponse(res, null, 'Procedure deleted successfully', 200);
  } catch (err) {
    console.error('Error deleting procedure:', err);
    return errorResponse(res, err, 'Error deleting procedure', 500);
  }
};
