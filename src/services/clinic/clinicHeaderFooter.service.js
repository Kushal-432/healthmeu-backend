const { ClinicHeaderFooter } = require('../../database/models');

// ➕ Create Header/Footer settings (clinic wise)
exports.createHeaderFooter = async (data) => {
  return await ClinicHeaderFooter.create(data);
};

// 📋 Get All Header/Footer settings (clinic wise)
exports.getAllHeaderFooters = async (clinic_id) => {
  return await ClinicHeaderFooter.findAll({
    where: { clinic_id },
    order: [['id', 'DESC']],
  });
};

// 🔍 Get Single Header/Footer (clinic wise)
exports.getHeaderFooterById = async (id, clinic_id) => {
  return await ClinicHeaderFooter.findOne({
    where: { id, clinic_id },
  });
};

// ✏️ Update Header/Footer (clinic wise)
exports.updateHeaderFooter = async (id, clinic_id, data) => {
  return await ClinicHeaderFooter.update(data, {
    where: { id, clinic_id },
  });
};

// 🗑️ Delete Header/Footer (clinic wise)
exports.deleteHeaderFooter = async (id, clinic_id) => {
  return await ClinicHeaderFooter.destroy({
    where: { id, clinic_id },
  });
};
