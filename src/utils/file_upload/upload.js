// utils/file_upload/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

function createUploader(folder) {
  const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
      const uploadPath = path.join(__dirname, '../../../public/uploads', folder);
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: function (_req, file, cb) {
      cb(null, folder + '-' + Date.now() + path.extname(file.originalname));
    },
  });

  return multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1 MB
  });
}

const uploadFile = (folder, fieldName, options = {}) => {
  const uploader = createUploader(folder);

  // CASE 1 → single file (default behavior)
  if (!options.multiple && !options.fields) {
    return uploader.single(fieldName);
  }

  // CASE 2 → multiple files for SAME field
  if (options.multiple) {
    return uploader.array(fieldName, options.multiple);
  }

  // CASE 3 → multiple fields with different names
  if (options.fields) {
    return uploader.fields(options.fields);
  }
};

module.exports = { uploadFile };
