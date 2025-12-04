const doctorService = require('../../services/clinic/doctor.service');
const { doctorValidator } = require('../../validators/clinic/doctor.validator');
const { uploadFile } = require('../../utils/file_upload/upload');
const fs = require('fs');
const path = require('path');
const { successResponse, errorResponse } = require('../../utils/response/response');
const logger = require('../../config/log'); // your logger file

// -------------------------------------------------------
// CREATE DOCTOR (clinic wise)
// -------------------------------------------------------
exports.createDoctor = [
  uploadFile('doctor', 'signature'),

  async (req, res) => {
    // Validate ONLY body fields
    const { error } = doctorValidator.validate(req.body);
    if (error) {
      return errorResponse(res, error, error.details[0].message, 400);
    }

    // Clinic ID
    const clinic_id = req.user.id;

    // Signature file
    let fileUrl = null;

    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      fileUrl = `${baseUrl}/uploads/doctor/${req.file.filename}`;
    }

    // Prepare data
    const doctorData = {
      ...req.body,
      clinic_id,
      signature: fileUrl,
    };

    // Save doctor
    const doctor = await doctorService.createDoctor(doctorData);

    return successResponse(res, doctor, 'Doctor created successfully', 200);
  },
];

// -------------------------------------------------------
// GET ALL DOCTORS (clinic wise)
// -------------------------------------------------------
exports.getAllDoctors = async (req, res) => {
  try {
    const clinic_id = req.user.id;

    const doctors = await doctorService.getAllDoctors(clinic_id);

    return successResponse(res, doctors, 'Doctors fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching Doctors', 500);
  }
};

// -------------------------------------------------------
// GET DOCTOR BY ID (clinic wise)
// -------------------------------------------------------
exports.getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const doctor = await doctorService.getDoctorById(id, clinic_id);
    if (!doctor) return errorResponse(res, null, 'Doctor not found', 404);

    return successResponse(res, doctor, 'Doctor fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching Doctor', 500);
  }
};

// -------------------------------------------------------
// UPDATE DOCTOR (clinic wise)
// -------------------------------------------------------
exports.updateDoctor = [
  uploadFile('doctor', 'signature'),

  async (req, res) => {
    try {
      const { id } = req.params;
      const clinic_id = req.user.id;

      // Check doctor
      const existing = await doctorService.getDoctorById(id, clinic_id);
      if (!existing) {
        return errorResponse(res, null, 'Doctor not found', 404);
      }

      // Prepare updateData only with passed fields
      let updateData = {};

      // Add only fields that exist in req.body
      Object.keys(req.body).forEach((key) => {
        if (req.body[key] !== undefined && req.body[key] !== '') {
          updateData[key] = req.body[key];
        }
      });

      // ---- Handle signature file ----
      if (req.file) {
        // Delete old signature
        if (existing.signature) {
          const oldPath = `.${new URL(existing.signature).pathname}`;
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        // Save new file URL
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        updateData.signature = `${baseUrl}/uploads/doctor/${req.file.filename}`;
      }

      const updated = await doctorService.updateDoctor(id, clinic_id, updateData);

      return successResponse(res, updated, 'Doctor updated successfully', 200);
    } catch (err) {
      console.error('Error updating Doctor:', err);
      return errorResponse(res, err, 'Error updating Doctor', 500);
    }
  },
];

// -------------------------------------------------------
// DELETE DOCTOR (clinic wise)
// -------------------------------------------------------
exports.deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await doctorService.getDoctorById(id, clinic_id);
    if (!existing) {
      return errorResponse(res, null, 'Doctor not found', 404);
    }

    // Delete signature file if exists
    if (existing.signature) {
      try {
        const fileName = existing.signature.split('/uploads/doctor/')[1];
        if (fileName) {
          const filePath = path.join(process.cwd(), 'public', 'uploads', 'doctor', fileName);

          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
      } catch (fileErr) {
        console.error('Signature Delete Error:', fileErr);
      }
    }

    await doctorService.deleteDoctor(id, clinic_id);

    return successResponse(res, null, 'Doctor deleted successfully', 200);
  } catch (err) {
    console.error('DELETE DOCTOR ERROR:', err);
    return errorResponse(res, err, 'Error deleting Doctor', 500);
  }
};
