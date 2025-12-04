const { bedtypeValidator } = require('../../validators/clinic/bedtype.validator');
const bedtypeService = require('../../services/clinic/bedtype.service');
const { successResponse, errorResponse } = require('../../utils/response/response');

// ----------------------------------------------
// CREATE BEDTYPE (clinic wise)
// ----------------------------------------------
exports.createBedtype = async (req, res) => {
  try {
    const { error } = bedtypeValidator.validate(req.body);
    if (error) return errorResponse(res, error, error.details[0].message, 400);

    const clinic_id = req.user.id; // ⭐ Logged-in clinic ID

    const payload = {
      ...req.body,
      clinic_id,
    };

    const bedtype = await bedtypeService.createBedtype(payload);

    return successResponse(res, bedtype, 'Bedtype created successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error creating bedtype', 500);
  }
};

// ----------------------------------------------
// GET ALL BEDTYPES (clinic wise)
// ----------------------------------------------
exports.getAllBedtypes = async (req, res) => {
  try {
    const clinic_id = req.user.id;

    const data = await bedtypeService.getAllBedtypes(clinic_id);

    return successResponse(res, data, 'Bedtypes fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching bedtypes', 500);
  }
};

// ----------------------------------------------
// GET SINGLE BEDTYPE (clinic wise)
// ----------------------------------------------
exports.getBedtypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const data = await bedtypeService.getBedtypeById(id, clinic_id);

    if (!data) {
      return errorResponse(res, null, 'Bedtype not found', 404);
    }

    return successResponse(res, data, 'Bedtype fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching bedtype', 500);
  }
};

// ----------------------------------------------
// UPDATE BEDTYPE (clinic wise)
// ----------------------------------------------
exports.updateBedtype = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await bedtypeService.getBedtypeById(id, clinic_id);
    if (!existing) {
      return errorResponse(res, null, 'Bedtype not found', 404);
    }

    const { error } = bedtypeValidator.validate(req.body);
    if (error) {
      return errorResponse(res, error, error.details[0].message, 400);
    }

    await bedtypeService.updateBedtype(id, clinic_id, req.body);

    return successResponse(res, null, 'Bedtype updated successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error updating bedtype', 500);
  }
};

// ----------------------------------------------
// DELETE BEDTYPE (clinic wise)
// ----------------------------------------------
exports.deleteBedtype = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await bedtypeService.getBedtypeById(id, clinic_id);
    if (!existing) {
      return errorResponse(res, null, 'Bedtype not found', 404);
    }

    await bedtypeService.deleteBedtype(id, clinic_id);

    return successResponse(res, null, 'Bedtype deleted successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error deleting bedtype', 500);
  }
};
