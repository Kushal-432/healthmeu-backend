const { Billheader } = require('../../database/models');
const billheaderService = require('../../services/clinic/billheader.service');
const { billheaderValidator } = require('../../validators/clinic/billheader.validator');
const { successResponse, errorResponse } = require('../../utils/response/response');

// ➕ Create Billheader (clinic wise)
exports.createBillheader = async (req, res) => {
  try {
    const clinic_id = req.user.id; // logged-in clinic

    const data = {
      clinic_id,
      ...req.body,
    };

    // Validate
    const { error } = billheaderValidator.validate(data);
    if (error) return errorResponse(res, error, error.details[0].message, 400);

    const created = await billheaderService.createBillheader(data);
    return successResponse(res, created, 'Billheader created successfully', 200);
  } catch (err) {
    console.error('Error creating Billheader:', err);
    return errorResponse(res, err, 'Error creating Billheader', 500);
  }
};

// 📋 Get All Billheaders (clinic wise)
exports.getAllBillheaders = async (req, res) => {
  try {
    const clinic_id = req.user.id;
    const result = await billheaderService.getAllBillheaders(clinic_id);
    return successResponse(res, result, 'Billheaders fetched successfully', 200);
  } catch (err) {
    console.error('Error fetching Billheaders:', err);
    return errorResponse(res, err, 'Error fetching Billheaders', 500);
  }
};

// 🔍 Get Single Billheader (clinic wise)
exports.getBillheaderById = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const record = await billheaderService.getBillheaderById(id, clinic_id);
    if (!record) return errorResponse(res, null, 'Billheader not found', 404);

    return successResponse(res, record, 'Billheader fetched successfully', 200);
  } catch (err) {
    console.error('Error fetching Billheader:', err);
    return errorResponse(res, err, 'Error fetching Billheader', 500);
  }
};

// ✏️ Update Billheader (clinic wise)
exports.updateBillheader = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await billheaderService.getBillheaderById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'Billheader not found', 404);

    const data = {
      ...req.body,
    };

    // Validate
    const { error } = billheaderValidator.validate(data, { allowUnknown: true });
    if (error) return errorResponse(res, error, error.details[0].message, 400);

    const updated = await billheaderService.updateBillheader(id, clinic_id, data);
    return successResponse(res, updated, 'Billheader updated successfully', 200);
  } catch (err) {
    console.error('Error updating Billheader:', err);
    return errorResponse(res, err, 'Error updating Billheader', 500);
  }
};

// 🗑️ Delete Billheader (clinic wise)
exports.deleteBillheader = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await billheaderService.getBillheaderById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'Billheader not found', 404);

    await billheaderService.deleteBillheader(id, clinic_id);
    return successResponse(res, null, 'Billheader deleted successfully', 200);
  } catch (err) {
    console.error('Error deleting Billheader:', err);
    return errorResponse(res, err, 'Error deleting Billheader', 500);
  }
};
