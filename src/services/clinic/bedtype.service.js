const { Bedtype } = require('../../database/models');

// ➕ Create Bedtype (clinic wise)
exports.createBedtype = async (data) => {
  return await Bedtype.create(data);
};

// 📋 Get All Bedtypes - Clinic Wise
exports.getAllBedtypes = async (clinic_id) => {
  return await Bedtype.findAll({
    where: { clinic_id },
    order: [['id', 'DESC']],
  });
};

// 🔍 Get Single Bedtype (clinic wise)
exports.getBedtypeById = async (id, clinic_id) => {
  return await Bedtype.findOne({
    where: { id, clinic_id },
  });
};

// ✏️ Update Bedtype (clinic wise)
exports.updateBedtype = async (id, clinic_id, data) => {
  return await Bedtype.update(data, {
    where: { id, clinic_id },
  });
};

// 🗑️ Delete Bedtype (clinic wise)
exports.deleteBedtype = async (id, clinic_id) => {
  return await Bedtype.destroy({
    where: { id, clinic_id },
  });
};
