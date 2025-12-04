const staffService = require('../../services/clinic/staff.service');
const { staffValidator } = require('../../validators/clinic/staff.validator');
const { uploadFile } = require('../../utils/file_upload/upload');
const fs = require('fs');
const path = require('path');
const { successResponse, errorResponse } = require('../../utils/response/response');

const getBaseUrl = (req) => `${req.protocol}://${req.get('host')}`;

// ---------------------------------------------------
// CREATE STAFF (CLINIC-WISE)
// ---------------------------------------------------
exports.createStaff = [
  uploadFile('staff', 'aadhar'),
  async (req, res) => {
    try {
      const { error } = staffValidator.validate(req.body);
      if (error) {
        if (req.file) fs.unlinkSync(req.file.path);
        return errorResponse(res, error, error.details[0].message, 400);
      }

      if (!req.file) {
        return errorResponse(res, null, 'Aadhar file is required', 400);
      }

      const clinic_id = req.user.id;

      const aadharUrl = `${getBaseUrl(req)}/uploads/staff/${req.file.filename}`;

      const created = await staffService.createStaff({
        ...req.body,
        aadhar: aadharUrl,
        clinic_id,
      });

      return successResponse(res, created, 'Staff created successfully', 200);
    } catch (err) {
      return errorResponse(res, err, 'Error creating staff', 500);
    }
  },
];

// ---------------------------------------------------
// GET ALL STAFF (CLINIC-WISE)
// ---------------------------------------------------
exports.getAllStaff = async (req, res) => {
  try {
    const clinic_id = req.user.id;

    const staff = await staffService.getAllStaff(clinic_id);

    return successResponse(res, staff, 'Staff fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching staff', 500);
  }
};

// ---------------------------------------------------
// GET SINGLE STAFF BY ID (CLINIC-WISE)
// ---------------------------------------------------
exports.getStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const staff = await staffService.getStaffById(id, clinic_id);
    if (!staff) return errorResponse(res, null, 'Staff not found', 404);

    return successResponse(res, staff, 'Staff fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching staff', 500);
  }
};

// ---------------------------------------------------
// UPDATE STAFF (CLINIC-WISE)
// ---------------------------------------------------
exports.updateStaff = [
  uploadFile('staff', 'aadhar'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const clinic_id = req.user.id;

      const existing = await staffService.getStaffById(id, clinic_id);
      if (!existing) {
        if (req.file) fs.unlinkSync(req.file.path);
        return errorResponse(res, null, 'Staff not found', 404);
      }

      const { error } = staffValidator.validate(req.body, { allowUnknown: true });
      if (error) {
        if (req.file) fs.unlinkSync(req.file.path);
        return errorResponse(res, error, error.details[0].message, 400);
      }

      let aadharUrl = existing.aadhar;

      // If new file uploaded -> delete old file
      if (req.file) {
        if (existing.aadhar) {
          try {
            const oldFileName = existing.aadhar.split('/uploads/staff/')[1];
            const oldPath = path.join(process.cwd(), 'public', 'uploads', 'staff', oldFileName);

            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
          } catch (fileErr) {
            console.error('Aadhar delete error:', fileErr);
          }
        }

        aadharUrl = `${getBaseUrl(req)}/uploads/staff/${req.file.filename}`;
      }

      const updated = await staffService.updateStaff(id, clinic_id, {
        ...req.body,
        aadhar: aadharUrl,
      });

      return successResponse(res, updated, 'Staff updated successfully', 200);
    } catch (err) {
      return errorResponse(res, err, 'Error updating staff', 500);
    }
  },
];

// ---------------------------------------------------
// DELETE STAFF (CLINIC-WISE)
// ---------------------------------------------------
exports.deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await staffService.getStaffById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'Staff not found', 404);

    // Delete aadhar file
    if (existing.aadhar) {
      try {
        const fileName = existing.aadhar.split('/uploads/staff/')[1];
        const filePath = path.join(process.cwd(), 'public', 'uploads', 'staff', fileName);

        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (err) {
        console.error('Aadhar file delete error:', err);
      }
    }

    await staffService.deleteStaff(id, clinic_id);

    return successResponse(res, null, 'Staff deleted successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error deleting staff', 500);
  }
};
