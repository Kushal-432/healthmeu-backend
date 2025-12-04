const fs = require('fs');
const path = require('path');
const { uploadFile } = require('../../utils/file_upload/upload');
const ipdService = require('../../services/clinic/ipd.service');
const { ipdSchema } = require('../../validators/clinic/ipd.validator');
const { successResponse, errorResponse } = require('../../utils/response/response');

// -----------------------------------------------
// CREATE IPD (Clinic-wise)
// -----------------------------------------------
exports.createIPD = [
  uploadFile('ipd', 'profile_img'),
  async (req, res) => {
    try {
      const clinic_id = req.user.id; // ⭐ clinic wise

      // Parse treatments JSON if needed
      if (req.body.treatments && typeof req.body.treatments === 'string') {
        try {
          req.body.treatments = JSON.parse(req.body.treatments);
        } catch (err) {
          if (req.file) fs.unlinkSync(req.file.path);
          return errorResponse(res, err, 'Invalid JSON in treatments', 400);
        }
      }

      // Validate input
      const { error } = ipdSchema.validate(req.body);
      if (error) {
        if (req.file) fs.unlinkSync(req.file.path);
        return errorResponse(res, error, error.details[0].message, 400);
      }

      // File URL
      let fileUrl = null;
      if (req.file) {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        fileUrl = `${baseUrl}/uploads/ipd/${req.file.filename}`;
      }

      const ipdData = {
        ...req.body,
        clinic_id,
        profile_img: fileUrl,
      };

      const ipd = await ipdService.createIPD(ipdData);

      return successResponse(res, ipd, 'IPD record created successfully', 200);
    } catch (err) {
      console.error('Error creating IPD:', err);
      return errorResponse(res, err, 'Error creating IPD', 500);
    }
  },
];

// -----------------------------------------------
// GET ALL IPD (Clinic-wise)
// -----------------------------------------------
exports.getAllIPD = async (req, res) => {
  try {
    const clinic_id = req.user.id;

    const list = await ipdService.getAllIPD(clinic_id);

    return successResponse(res, list, 'IPD records fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching IPD records', 500);
  }
};

// -----------------------------------------------
// GET SINGLE IPD BY ID (Clinic-wise)
// -----------------------------------------------
exports.getIPDById = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const ipd = await ipdService.getIPDById(id, clinic_id);

    if (!ipd) return errorResponse(res, null, 'IPD record not found', 404);

    return successResponse(res, ipd, 'IPD record fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching IPD record', 500);
  }
};

// -----------------------------------------------
// UPDATE IPD (Clinic-wise)
// -----------------------------------------------
exports.updateIPD = [
  uploadFile('ipd', 'profile_img'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const clinic_id = req.user.id;

      // Parse JSON fields
      if (req.body.treatments && typeof req.body.treatments === 'string') {
        try {
          req.body.treatments = JSON.parse(req.body.treatments);
        } catch (err) {
          if (req.file) fs.unlinkSync(req.file.path);
          return errorResponse(res, err, 'Invalid JSON in treatments', 400);
        }
      }

      const existing = await ipdService.getIPDById(id, clinic_id);
      if (!existing) {
        if (req.file) fs.unlinkSync(req.file.path);
        return errorResponse(res, null, 'IPD record not found', 404);
      }

      // Validate updated fields
      const { error } = ipdSchema.validate(req.body, { allowUnknown: true });
      if (error) {
        if (req.file) fs.unlinkSync(req.file.path);
        return errorResponse(res, error, error.details[0].message, 400);
      }

      // Handle new image
      let fileUrl = existing.profile_img;

      if (req.file) {
        if (existing.profile_img) {
          const oldFilePath = `.${new URL(existing.profile_img).pathname}`;
          if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        fileUrl = `${baseUrl}/uploads/ipd/${req.file.filename}`;
      }

      const updatedData = {
        ...req.body,
        profile_img: fileUrl,
      };

      const updated = await ipdService.updateIPD(id, clinic_id, updatedData);

      return successResponse(res, updated, 'IPD record updated successfully', 200);
    } catch (err) {
      console.error('Error updating IPD:', err);
      return errorResponse(res, err, 'Error updating IPD', 500);
    }
  },
];

// -----------------------------------------------
// DELETE IPD (Clinic-wise)
// -----------------------------------------------
exports.deleteIPD = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await ipdService.getIPDById(id, clinic_id);

    if (!existing) return errorResponse(res, null, 'IPD record not found', 404);

    // Delete image
    if (existing.profile_img) {
      const fileName = existing.profile_img.split('/uploads/ipd/')[1];

      if (fileName) {
        const filePath = path.join(process.cwd(), 'public', 'uploads', 'ipd', fileName);

        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    }

    await ipdService.deleteIPD(id, clinic_id);

    return successResponse(res, null, 'IPD record deleted successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error deleting IPD', 500);
  }
};

exports.filterIPD = async (req, res) => {
  try {
    const clinic_id = req.user.id; // get clinic id from token

    const data = await ipdService.filterIPD(req.body, clinic_id);

    return successResponse(res, data, 'IPD filtered successfully', 200);
  } catch (err) {
    return errorResponse(res, err, err.message || 'Failed to filter IPD', 400);
  }
};
