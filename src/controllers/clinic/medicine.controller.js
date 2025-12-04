const medicineService = require('../../services/clinic/medicine.service');
const { medicineValidator } = require('../../validators/clinic/medicine.validator');
const { successResponse, errorResponse } = require('../../utils/response/response');

// -------------------------------------------------------
// CREATE Medicine (CLINIC-WISE)
// -------------------------------------------------------
exports.createMedicine = async (req, res) => {
  try {
    // Validate
    const { error } = medicineValidator.validate(req.body);
    if (error) return errorResponse(res, error, error.details[0].message, 400);

    const clinic_id = req.user.id; // clinic ID from logged-in user

    const medicine = await medicineService.createMedicine({
      ...req.body,
      clinic_id,
    });

    return successResponse(res, medicine, 'Medicine created successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error creating Medicine', 500);
  }
};

// -------------------------------------------------------
// GET ALL Medicines (CLINIC-WISE)
// -------------------------------------------------------
exports.getAllMedicine = async (req, res) => {
  try {
    const clinic_id = req.user.id;

    const list = await medicineService.getAllMedicine(clinic_id);

    return successResponse(res, list, 'Medicines fetched successfully', 200);
  } catch (err) {
    console.error('🔥 ERROR in getAllMedicine:', err);
    return errorResponse(res, err, 'Error fetching Medicines', 500);
  }
};

// -------------------------------------------------------
// GET SINGLE Medicine (CLINIC-WISE)
// -------------------------------------------------------
exports.getMedicineById = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const medicine = await medicineService.getMedicineById(id, clinic_id);

    if (!medicine) return errorResponse(res, null, 'Medicine not found', 404);

    return successResponse(res, medicine, 'Medicine fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching Medicine', 500);
  }
};

// -------------------------------------------------------
// UPDATE Medicine (CLINIC-WISE)
// -------------------------------------------------------
exports.updateMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await medicineService.getMedicineById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'Medicine not found', 404);

    const { error } = medicineValidator.validate(req.body);
    if (error) return errorResponse(res, error, error.details[0].message, 400);

    const updated = await medicineService.updateMedicine(id, clinic_id, req.body);

    return successResponse(res, updated, 'Medicine updated successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error updating Medicine', 500);
  }
};

// -------------------------------------------------------
// DELETE Medicine (CLINIC-WISE)
// -------------------------------------------------------
exports.deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await medicineService.getMedicineById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'Medicine not found', 404);

    await medicineService.deleteMedicine(id, clinic_id);

    return successResponse(res, null, 'Medicine deleted successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error deleting Medicine', 500);
  }
};
