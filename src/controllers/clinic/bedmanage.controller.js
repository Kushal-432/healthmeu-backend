const { bedmanageValidator } = require('../../validators/clinic/bedmanage.validator');
const bedmanageService = require('../../services/clinic/bedmanage.service');
const { successResponse, errorResponse } = require('../../utils/response/response');

// ----------------------------------------------
// CREATE BEDMANAGE (clinic wise)
// ----------------------------------------------
exports.createBedmanage = async (req, res) => {
  try {
    const { error } = bedmanageValidator.validate(req.body);
    if (error) return errorResponse(res, error, error.details[0].message, 400);

    const clinic_id = req.user.id; // ⭐ Logged-in clinic ID

    const payload = {
      ...req.body,
      clinic_id,
    };

    const data = await bedmanageService.createBedmanage(payload);

    return successResponse(res, data, 'Bedmanage created successfully', 200);
  } catch (err) {
    console.log('CREATE BEDMANAGE ERROR:', err);
    return errorResponse(res, err, 'Error creating Bedmanage', 500);
  }
};

// ----------------------------------------------
// GET ALL BEDMANAGES (clinic wise)
// ----------------------------------------------
exports.getAllBedmanages = async (req, res) => {
  try {
    const clinic_id = req.user.id;

    const data = await bedmanageService.getAllBedmanages(clinic_id);

    return successResponse(res, data, 'Bedmanage records fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching Bedmanage records', 500);
  }
};

// ----------------------------------------------
// GET SINGLE BEDMANAGE (clinic wise)
// ----------------------------------------------
exports.getBedmanageById = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const data = await bedmanageService.getBedmanageById(id, clinic_id);
    if (!data) return errorResponse(res, null, 'Bedmanage record not found', 404);

    return successResponse(res, data, 'Bedmanage record fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching Bedmanage record', 500);
  }
};

// ----------------------------------------------
// UPDATE BEDMANAGE (clinic wise)
// ----------------------------------------------
exports.updateBedmanage = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await bedmanageService.getBedmanageById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'Bedmanage record not found', 404);

    const { error } = bedmanageValidator.validate(req.body);
    if (error) return errorResponse(res, error, error.details[0].message, 400);

    await bedmanageService.updateBedmanage(id, clinic_id, req.body);

    return successResponse(res, null, 'Bedmanage updated successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error updating Bedmanage', 500);
  }
};

// ----------------------------------------------
// DELETE BEDMANAGE (clinic wise)
// ----------------------------------------------
exports.deleteBedmanage = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await bedmanageService.getBedmanageById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'Bedmanage record not found', 404);

    await bedmanageService.deleteBedmanage(id, clinic_id);

    return successResponse(res, null, 'Bedmanage deleted successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error deleting Bedmanage', 500);
  }
};
