const opdService = require('../../services/clinic/opd.service');
const { opdSchema } = require('../../validators/clinic/opd.validator');
const { uploadFile } = require('../../utils/file_upload/upload');
const fs = require('fs');
const path = require('path');
const { successResponse, errorResponse } = require('../../utils/response/response');

// Helper: Base URL for uploaded files
const getBaseUrl = (req) => `${req.protocol}://${req.get('host')}`;

// -------------------------------------------------------
// CREATE OPD — Clinic Wise
// -------------------------------------------------------
exports.createOPD = [
  uploadFile('opd', 'profile_img'),
  async (req, res) => {
    try {
      const clinic_id = req.user.id; // numeric clinic database ID

      // Validate input
      const { error } = opdSchema.validate(req.body);
      if (error) {
        if (req.file) fs.unlinkSync(req.file.path);
        return errorResponse(res, error, error.details[0].message, 400);
      }

      const profileImgUrl = req.file ? `${getBaseUrl(req)}/uploads/opd/${req.file.filename}` : null;

      const opdData = {
        ...req.body,
        clinic_id,
        profile_img: profileImgUrl,
      };

      const opd = await opdService.createOPD(opdData);
      return successResponse(res, opd, 'OPD created successfully', 200);
    } catch (err) {
      return errorResponse(res, err, 'Error creating OPD', 500);
    }
  },
];

// -------------------------------------------------------
// GET ALL OPDs — Clinic Wise
// -------------------------------------------------------
exports.getAllOPD = async (req, res) => {
  try {
    const clinic_id = req.user.id;
    console.log('CLINIC ID FROM TOKEN:', clinic_id);

    const opds = await opdService.getAllOPD(clinic_id);
    return successResponse(res, opds, 'All OPDs fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching OPDs', 500);
  }
};

// -------------------------------------------------------
// GET OPD BY ID — Clinic Wise
// -------------------------------------------------------
exports.getOPDById = async (req, res) => {
  try {
    const clinic_id = req.user.id;
    const opd = await opdService.getOPDById(req.params.id, clinic_id);

    if (!opd) return errorResponse(res, null, 'OPD not found', 404);

    return successResponse(res, opd, 'OPD fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching OPD', 500);
  }
};

// -------------------------------------------------------
// UPDATE OPD — Clinic Wise
// -------------------------------------------------------
exports.updateOPD = [
  uploadFile('opd', 'profile_img'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const clinic_id = req.user.id;
      const existing = await opdService.getOPDById(id, clinic_id);
      if (!existing) {
        if (req.file) fs.unlinkSync(req.file.path);
        return errorResponse(res, null, 'OPD not found', 404);
      }

      const { error } = opdSchema.validate(req.body, { allowUnknown: true });
      if (error) {
        if (req.file) fs.unlinkSync(req.file.path);
        return errorResponse(res, error, error.details[0].message, 400);
      }

      let profileImgUrl = existing.profile_img;

      if (req.file) {
        try {
          if (existing.profile_img) {
            const oldFile = path.join(
              process.cwd(),
              'public',
              existing.profile_img.replace(`${getBaseUrl(req)}/`, '')
            );
            if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);
          }
        } catch (err) {
          console.error('Old profile image delete error:', err);
        }
        profileImgUrl = `${getBaseUrl(req)}/uploads/opd/${req.file.filename}`;
      }

      const updateData = { ...req.body, profile_img: profileImgUrl };

      const updated = await opdService.updateOPD(id, clinic_id, updateData);
      return successResponse(res, updated, 'OPD updated successfully', 200);
    } catch (err) {
      return errorResponse(res, err, 'Error updating OPD', 500);
    }
  },
];

// -------------------------------------------------------
// DELETE OPD — Clinic Wise
// -------------------------------------------------------
exports.deleteOPD = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await opdService.getOPDById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'OPD not found', 404);

    if (existing.profile_img) {
      try {
        const oldFile = path.join(
          process.cwd(),
          'public',
          existing.profile_img.replace(`${getBaseUrl(req)}/`, '')
        );
        if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);
      } catch (err) {
        console.error('Profile image delete error:', err);
      }
    }

    await opdService.deleteOPD(id, clinic_id);
    return successResponse(res, null, 'OPD deleted successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error deleting OPD', 500);
  }
};

exports.filterOPD = async (req, res) => {
  try {
    const clinic_id = req.user.id; // get clinic id from token

    const data = await opdService.filterOPD(req.body, clinic_id);

    return successResponse(res, data, 'OPD filtered successfully', 200);
  } catch (err) {
    return errorResponse(res, err, err.message || 'Failed to filter OPD', 400);
  }
};
