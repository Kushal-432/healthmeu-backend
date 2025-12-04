const { bedlocationValidator } = require('../../validators/clinic/bedlocation.validator');
const bedlocationService = require('../../services/clinic/bedlocation.service');
const { successResponse, errorResponse } = require('../../utils/response/response');

// ----------------------------------------------
// CREATE BEDLOCATION (clinic wise)
// ----------------------------------------------
exports.createBedlocation = async (req, res) => {
  try {
    const { error } = bedlocationValidator.validate(req.body);
    if (error) return errorResponse(res, error, error.details[0].message, 400);

    const clinic_id = req.user.id; // ⭐ Logged-in clinic ID

    const payload = {
      ...req.body,
      clinic_id,
    };

    const bedlocation = await bedlocationService.createBedlocation(payload);

    return successResponse(res, bedlocation, 'Bedlocation created successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error creating bedlocation', 500);
  }
};

// ----------------------------------------------
// GET ALL BEDLOCATIONS (clinic wise)
// ----------------------------------------------
exports.getAllBedlocations = async (req, res) => {
  try {
    const clinic_id = req.user.id;

    const data = await bedlocationService.getAllBedlocations(clinic_id);

    return successResponse(res, data, 'Bedlocations fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching bedlocations', 500);
  }
};

// ----------------------------------------------
// GET SINGLE BEDLOCATION (clinic wise)
// ----------------------------------------------
exports.getBedlocationById = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const data = await bedlocationService.getBedlocationById(id, clinic_id);

    if (!data) {
      return errorResponse(res, null, 'Bedlocation not found', 404);
    }

    return successResponse(res, data, 'Bedlocation fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching bedlocation', 500);
  }
};

// ----------------------------------------------
// UPDATE BEDLOCATION (clinic wise)
// ----------------------------------------------
exports.updateBedlocation = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await bedlocationService.getBedlocationById(id, clinic_id);
    if (!existing) {
      return errorResponse(res, null, 'Bedlocation not found', 404);
    }

    const { error } = bedlocationValidator.validate(req.body);
    if (error) {
      return errorResponse(res, error, error.details[0].message, 400);
    }

    await bedlocationService.updateBedlocation(id, clinic_id, req.body);

    return successResponse(res, null, 'Bedlocation updated successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error updating bedlocation', 500);
  }
};

// ----------------------------------------------
// DELETE BEDLOCATION (clinic wise)
// ----------------------------------------------
exports.deleteBedlocation = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await bedlocationService.getBedlocationById(id, clinic_id);
    if (!existing) {
      return errorResponse(res, null, 'Bedlocation not found', 404);
    }

    await bedlocationService.deleteBedlocation(id, clinic_id);

    return successResponse(res, null, 'Bedlocation deleted successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error deleting bedlocation', 500);
  }
};
