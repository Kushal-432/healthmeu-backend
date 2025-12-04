const fs = require('fs');
const path = require('path');
const { uploadFile } = require('../../utils/file_upload/upload');
const { daycareSchema } = require('../../validators/clinic/daycare.validator');
const daycareService = require('../../services/clinic/daycare.service');
const { successResponse, errorResponse } = require('../../utils/response/response');

// Helper to generate full URL
const getBaseUrl = (req) => `${req.protocol}://${req.get('host')}`;

/* =======================================================
   CREATE DAYCARE (Clinic Wise)
======================================================= */
exports.createDaycare = [
  uploadFile('daycare', 'consent_letter'),
  async (req, res) => {
    try {
      const clinic_id = req.user.id; // ⭐ CORRECT CLINIC ID

      // Parse procedures if sent as string
      if (req.body.procedures && typeof req.body.procedures === 'string') {
        try {
          req.body.procedures = JSON.parse(req.body.procedures);
        } catch (err) {
          return errorResponse(res, err, 'Invalid JSON format for procedures', 400);
        }
      }

      // Validate body
      const { error } = daycareSchema.validate(req.body);
      if (error) {
        if (req.file) fs.unlinkSync(req.file.path);
        return errorResponse(res, error, error.details[0].message, 400);
      }

      // Prepare file URL
      let consent_letter = null;
      if (req.file) {
        consent_letter = `${getBaseUrl(req)}/uploads/daycare/${req.file.filename}`;
      }

      // Prepare data
      const daycareData = {
        ...req.body,
        clinic_id, // ⭐ IMPORTANT
        consent_letter,
      };

      const daycare = await daycareService.createDaycare(daycareData);

      return successResponse(res, daycare, 'Daycare created successfully', 200);
    } catch (err) {
      return errorResponse(res, err, 'Error creating daycare', 500);
    }
  },
];

/* =======================================================
   GET ALL DAYCARE (Clinic Wise)
======================================================= */
exports.getAllDaycare = async (req, res) => {
  try {
    const clinic_id = req.user.id; // ⭐ CORRECT
    const daycareList = await daycareService.getAllDaycare(clinic_id);

    return successResponse(res, daycareList, 'Daycare list fetched', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching daycare list', 500);
  }
};

/* =======================================================
   GET DAYCARE BY ID (Clinic Wise)
======================================================= */
exports.getDaycareById = async (req, res) => {
  try {
    const clinic_id = req.user.id; // ⭐ CORRECT
    const { id } = req.params;

    const daycare = await daycareService.getDaycareById(id, clinic_id);
    if (!daycare) return errorResponse(res, null, 'Daycare not found', 404);

    return successResponse(res, daycare, 'Daycare fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching daycare', 500);
  }
};

/* =======================================================
   UPDATE DAYCARE (Clinic Wise)
======================================================= */
exports.updateDaycare = [
  uploadFile('daycare', 'consent_letter'),
  async (req, res) => {
    try {
      const clinic_id = req.user.id; // ⭐ CORRECT
      const { id } = req.params;

      // Parse procedures if string
      if (req.body.procedures && typeof req.body.procedures === 'string') {
        try {
          req.body.procedures = JSON.parse(req.body.procedures);
        } catch (err) {
          return errorResponse(res, err, 'Invalid JSON format for procedures', 400);
        }
      }

      // Validate
      const { error } = daycareSchema.validate(req.body, { allowUnknown: true });
      if (error) {
        if (req.file) fs.unlinkSync(req.file.path);
        return errorResponse(res, error, error.details[0].message, 400);
      }

      const existing = await daycareService.getDaycareById(id, clinic_id);
      if (!existing) {
        if (req.file) fs.unlinkSync(req.file.path);
        return errorResponse(res, null, 'Daycare not found', 404);
      }

      // Handle file replacement
      let consent_letter = existing.consent_letter;

      if (req.file) {
        // Delete old file
        if (existing.consent_letter) {
          const oldFile = path.join(
            process.cwd(),
            'public',
            existing.consent_letter.replace(`${getBaseUrl(req)}/`, '')
          );

          if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);
        }

        consent_letter = `${getBaseUrl(req)}/uploads/daycare/${req.file.filename}`;
      }

      const updateData = {
        ...req.body,
        clinic_id, // ⭐ still required
        consent_letter,
      };

      const updated = await daycareService.updateDaycare(id, clinic_id, updateData);

      return successResponse(res, updated, 'Daycare updated successfully', 200);
    } catch (err) {
      return errorResponse(res, err, 'Error updating daycare', 500);
    }
  },
];

/* =======================================================
   DELETE DAYCARE (Clinic Wise)
======================================================= */
exports.deleteDaycare = async (req, res) => {
  try {
    const clinic_id = req.user.id; // ⭐ CORRECT
    const { id } = req.params;

    const existing = await daycareService.getDaycareById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'Daycare not found', 404);

    // Delete file
    if (existing.consent_letter) {
      const file = existing.consent_letter.split('/uploads/daycare/')[1];
      if (file) {
        const filePath = path.join(process.cwd(), 'public', 'uploads', 'daycare', file);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    }

    await daycareService.deleteDaycare(id, clinic_id);

    return successResponse(res, null, 'Daycare deleted successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error deleting daycare', 500);
  }
};
// CONTROLLER
exports.filterDaycare = async (req, res) => {
  try {
    const clinic_id = req.user.id; // clinic id from token

    const data = await daycareService.filterDaycare({
      ...req.body,
      clinic_id,
    });

    return successResponse(res, data, 'Daycare filtered successfully', 200);
  } catch (err) {
    return errorResponse(res, err, err.message || 'Failed to filter daycare', 400);
  }
};
