const clinicHeaderFooterService = require('../../services/clinic/clinicHeaderFooter.service');
const {
  clinicHeaderFooterValidator,
} = require('../../validators/clinic/clinicHeaderFooter.validator');
const { uploadFile } = require('../../utils/file_upload/upload');
const fs = require('fs');
const { successResponse, errorResponse } = require('../../utils/response/response');
const path = require('path');

/*---------------------------------------------------------------------
 CREATE HEADER/FOOTER (clinic-wise)
---------------------------------------------------------------------*/
exports.createHeaderFooter = async (req, res) => {
  try {
    const clinic_id = req.user.id;

    // 1️⃣ Upload both fields at once using fields()
    const uploadBoth = uploadFile('clinic', null, {
      fields: [
        { name: 'header_image', maxCount: 1 },
        { name: 'footer_image', maxCount: 1 },
      ],
    });

    uploadBoth(req, res, async (err) => {
      if (err) {
        return errorResponse(res, err, err.message, 400);
      }

      // 2️⃣ Get uploaded file names
      const headerFile =
        req.files?.header_image?.length > 0 ? req.files.header_image[0].filename : null;

      const footerFile =
        req.files?.footer_image?.length > 0 ? req.files.footer_image[0].filename : null;

      const baseUrl = `${req.protocol}://${req.get('host')}`;

      // 3️⃣ Prepare data object
      const data = {
        clinic_id,
        header_image: headerFile ? `${baseUrl}/uploads/clinic/${headerFile}` : null,
        footer_image: footerFile ? `${baseUrl}/uploads/clinic/${footerFile}` : null,
        ...req.body,
      };

      // 4️⃣ Validate with Joi
      const { error } = clinicHeaderFooterValidator.validate(data);
      if (error) {
        return errorResponse(res, error, error.details[0].message, 400);
      }

      // 5️⃣ Save to DB
      const created = await clinicHeaderFooterService.createHeaderFooter(data);

      return successResponse(res, created, 'Header/Footer created successfully', 200);
    });
  } catch (err) {
    return errorResponse(res, err, 'Error creating Header/Footer', 500);
  }
};

/*---------------------------------------------------------------------
 GET ALL (clinic-wise)
---------------------------------------------------------------------*/
exports.getAllHeaderFooters = async (req, res) => {
  try {
    const clinic_id = req.user.id;

    const result = await clinicHeaderFooterService.getAllHeaderFooters(clinic_id);
    return successResponse(res, result, 'Header/Footers fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching Header/Footer', 500);
  }
};

/*---------------------------------------------------------------------
 GET SINGLE BY ID
---------------------------------------------------------------------*/
exports.getHeaderFooterById = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const record = await clinicHeaderFooterService.getHeaderFooterById(id, clinic_id);
    if (!record) return errorResponse(res, null, 'Header/Footer not found', 404);

    return successResponse(res, record, 'Header/Footer fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching Header/Footer', 500);
  }
};

/*---------------------------------------------------------------------
 UPDATE HEADER/FOOTER (clinic-wise)
---------------------------------------------------------------------*/
exports.updateHeaderFooter = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    // Fetch existing record
    const existing = await clinicHeaderFooterService.getHeaderFooterById(id, clinic_id);
    if (!existing) {
      return errorResponse(res, null, 'Header/Footer not found', 404);
    }

    // Upload both images
    const uploadBoth = uploadFile('clinic', null, {
      fields: [
        { name: 'header_image', maxCount: 1 },
        { name: 'footer_image', maxCount: 1 },
      ],
    });

    uploadBoth(req, res, async (err) => {
      if (err) return errorResponse(res, err, err.message, 400);

      const baseUrl = `${req.protocol}://${req.get('host')}`;
      let updateData = { ...req.body };

      /* ---------------------------------------------------------------
         UPDATE HEADER IMAGE
      ----------------------------------------------------------------*/
      if (req.files?.header_image?.[0]) {
        const newHeaderFile = req.files.header_image[0].filename;

        // Delete old header file
        if (existing.header_image) {
          const oldPath = `.${new URL(existing.header_image).pathname}`;
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        // Save updated file path
        updateData.header_image = `${baseUrl}/uploads/clinic/${newHeaderFile}`;
      }

      /* ---------------------------------------------------------------
         UPDATE FOOTER IMAGE
      ----------------------------------------------------------------*/
      if (req.files?.footer_image?.[0]) {
        const newFooterFile = req.files.footer_image[0].filename;

        // Delete old footer file
        if (existing.footer_image) {
          const oldPath = `.${new URL(existing.footer_image).pathname}`;
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        // Save updated file path
        updateData.footer_image = `${baseUrl}/uploads/clinic/${newFooterFile}`;
      }

      // Update database
      const updated = await clinicHeaderFooterService.updateHeaderFooter(id, clinic_id, updateData);

      return successResponse(res, updated, 'Header/Footer updated successfully', 200);
    });
  } catch (err) {
    return errorResponse(res, err, 'Error updating Header/Footer', 500);
  }
};

/*---------------------------------------------------------------------
 DELETE
---------------------------------------------------------------------*/
exports.deleteHeaderFooter = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await clinicHeaderFooterService.getHeaderFooterById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'Header/Footer not found', 404);

    // Helper to delete a file from URL
    const deleteFileFromUrl = (fileUrl) => {
      if (!fileUrl) return;
      try {
        const filename = path.basename(new URL(fileUrl).pathname);
        const filePath = path.join(__dirname, '../../../public/uploads/clinic', filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (err) {
        console.error('Error deleting file:', err);
      }
    };

    deleteFileFromUrl(existing.header_image);
    deleteFileFromUrl(existing.footer_image);

    // Delete record from DB
    await clinicHeaderFooterService.deleteHeaderFooter(id, clinic_id);

    return successResponse(res, null, 'Header/Footer deleted successfully', 200);
  } catch (err) {
    console.error('Error deleting Header/Footer:', err);
    return errorResponse(res, err, 'Error deleting Header/Footer', 500);
  }
};
