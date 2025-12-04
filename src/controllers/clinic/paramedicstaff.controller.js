// controllers/clinic/paramedicstaff.controller.js

const paramedicStaffService = require('../../services/clinic/paramedicstaff.service');
const { paramedicStaffValidator } = require('../../validators/clinic/paramedicstaff.validator');
const { uploadFile } = require('../../utils/file_upload/upload');
const fs = require('fs');
const path = require('path');
const { successResponse, errorResponse } = require('../../utils/response/response');

const getBaseUrl = (req) => `${req.protocol}://${req.get('host')}`;
const UPLOAD_FOLDER = 'paramedicstaff';

/* ---------------------------------------------------
   CREATE PARAMEDIC STAFF (CLINIC-WISE)
--------------------------------------------------- */
exports.createParamedicStaff = [
  uploadFile(UPLOAD_FOLDER, 'aadhar'),
  async (req, res) => {
    try {
      // JOI Validation
      const { error } = paramedicStaffValidator.validate(req.body);
      if (error) {
        if (req.file) fs.unlinkSync(req.file.path);
        return errorResponse(res, error, error.details[0].message, 400);
      }

      // File is required
      if (!req.file) {
        return errorResponse(res, null, 'Aadhar file is required', 400);
      }

      const clinic_id = req.user.id;

      const aadharUrl = `${getBaseUrl(req)}/uploads/${UPLOAD_FOLDER}/${req.file.filename}`;

      const created = await paramedicStaffService.createParamedicStaff({
        ...req.body,
        aadhar: aadharUrl,
        clinic_id,
      });

      return successResponse(res, created, 'Paramedic Staff created successfully', 200);
    } catch (err) {
      console.error('CREATE PARAMEDIC STAFF ERROR:', err);
      return errorResponse(res, err, 'Error creating paramedic staff', 500);
    }
  },
];

/* ---------------------------------------------------
   GET ALL PARAMEDIC STAFF
--------------------------------------------------- */
exports.getAllParamedicStaff = async (req, res) => {
  try {
    const clinic_id = req.user.id;

    const staff = await paramedicStaffService.getAllParamedicStaff(clinic_id);

    return successResponse(res, staff, 'Paramedic Staff fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching paramedic staff', 500);
  }
};

/* ---------------------------------------------------
   GET SINGLE PARAMEDIC STAFF
--------------------------------------------------- */
exports.getParamedicStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const staff = await paramedicStaffService.getParamedicStaffById(id, clinic_id);

    if (!staff) return errorResponse(res, null, 'Paramedic Staff not found', 404);

    return successResponse(res, staff, 'Paramedic Staff fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching paramedic staff', 500);
  }
};

/* ---------------------------------------------------
   UPDATE PARAMEDIC STAFF (CLINIC-WISE)
--------------------------------------------------- */
exports.updateParamedicStaff = [
  uploadFile(UPLOAD_FOLDER, 'aadhar'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const clinic_id = req.user.id;

      // Check if staff exists
      const existing = await paramedicStaffService.getParamedicStaffById(id, clinic_id);
      if (!existing) {
        if (req.file) fs.unlinkSync(req.file.path);
        return errorResponse(res, null, 'Paramedic Staff not found', 404);
      }

      // Validate Update Body
      const { error } = paramedicStaffValidator.validate(req.body, { allowUnknown: true });
      if (error) {
        if (req.file) fs.unlinkSync(req.file.path);
        return errorResponse(res, error, error.details[0].message, 400);
      }

      let aadharUrl = existing.aadhar;

      // If user uploaded new file → remove old file
      if (req.file) {
        try {
          const oldFileName = existing.aadhar?.split(`/uploads/${UPLOAD_FOLDER}/`)[1];
          const oldPath = path.join(process.cwd(), 'public', 'uploads', UPLOAD_FOLDER, oldFileName);

          if (oldFileName && fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
          }
        } catch (fileErr) {
          console.error('Aadhar delete error:', fileErr);
        }

        aadharUrl = `${getBaseUrl(req)}/uploads/${UPLOAD_FOLDER}/${req.file.filename}`;
      }

      const updated = await paramedicStaffService.updateParamedicStaff(id, clinic_id, {
        ...req.body,
        aadhar: aadharUrl,
      });

      return successResponse(res, updated, 'Paramedic Staff updated successfully', 200);
    } catch (err) {
      return errorResponse(res, err, 'Error updating paramedic staff', 500);
    }
  },
];

/* ---------------------------------------------------
   DELETE PARAMEDIC STAFF
--------------------------------------------------- */
exports.deleteParamedicStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await paramedicStaffService.getParamedicStaffById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'Paramedic Staff not found', 404);

    // Delete File
    try {
      const fileName = existing.aadhar?.split(`/uploads/${UPLOAD_FOLDER}/`)[1];
      const filePath = path.join(process.cwd(), 'public', 'uploads', UPLOAD_FOLDER, fileName);

      if (fileName && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      console.error('Aadhar file delete error:', err);
    }

    await paramedicStaffService.deleteParamedicStaff(id, clinic_id);

    return successResponse(res, null, 'Paramedic Staff deleted successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error deleting paramedic staff', 500);
  }
};
