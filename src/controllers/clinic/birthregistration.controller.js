const birthregistrationService = require('../../services/clinic/birthregistration.service');
const {
  birthregistrationValidator,
} = require('../../validators/clinic/birthregistration.validator');
const { successResponse, errorResponse } = require('../../utils/response/response');

// -------------------------------------------------------
// CREATE BIRTH REGISTRATION (CLINIC-WISE)
// -------------------------------------------------------
exports.createBirthRegistration = async (req, res) => {
  try {
    const { error } = birthregistrationValidator.validate(req.body);
    if (error) return errorResponse(res, error.details[0].message);

    const clinic_id = req.user.id;

    const data = {
      ...req.body,
      clinic_id,
    };

    const record = await birthregistrationService.createBirthRegistration(data);
    return successResponse(res, record, 'Birth registration added successfully');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// -------------------------------------------------------
// GET ALL BIRTH REGISTRATIONS (CLINIC-WISE)
// -------------------------------------------------------
exports.getAllBirthRegistrations = async (req, res) => {
  try {
    const clinic_id = req.user.id;
    const records = await birthregistrationService.getAllBirthRegistrations(clinic_id);

    return successResponse(res, records);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// -------------------------------------------------------
// GET SINGLE BIRTH REGISTRATION (CLINIC-WISE)
// -------------------------------------------------------
exports.getBirthRegistrationById = async (req, res) => {
  try {
    const clinic_id = req.user.id;
    const { id } = req.params;

    const record = await birthregistrationService.getBirthRegistrationById(id, clinic_id);
    if (!record) return errorResponse(res, 'Birth registration not found', 404);

    return successResponse(res, record);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// -------------------------------------------------------
// UPDATE BIRTH REGISTRATION (CLINIC-WISE)
// -------------------------------------------------------
exports.updateBirthRegistration = async (req, res) => {
  try {
    const { error } = birthregistrationValidator.validate(req.body);
    if (error) return errorResponse(res, error.details[0].message);

    const clinic_id = req.user.id;
    const { id } = req.params;

    const updated = await birthregistrationService.updateBirthRegistration(id, clinic_id, req.body);

    if (!updated) return errorResponse(res, 'Birth registration not found', 404);

    return successResponse(res, updated, 'Birth registration updated successfully');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// -------------------------------------------------------
// DELETE BIRTH REGISTRATION (CLINIC-WISE)
// -------------------------------------------------------
exports.deleteBirthRegistration = async (req, res) => {
  try {
    const clinic_id = req.user.id;
    const { id } = req.params;

    const deleted = await birthregistrationService.deleteBirthRegistration(id, clinic_id);

    if (!deleted) return errorResponse(res, 'Birth registration not found', 404);

    return successResponse(res, null, 'Birth registration deleted successfully');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};
exports.searchBirthRegistration = async (req, res) => {
  try {
    const clinic_id = req.user.id; // from token
    const filters = req.body; // { search, date }

    const records = await birthregistrationService.searchBirthRegistration(clinic_id, filters);

    return successResponse(res, records);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};
