const { Bedlocation } = require('../../database/models');

// ➕ Create Bedlocation (clinic wise)
exports.createBedlocation = async (data) => {
  return await Bedlocation.create(data);
};

// 📋 Get All Bedlocations (clinic wise)
exports.getAllBedlocations = async (clinic_id) => {
  return await Bedlocation.findAll({
    where: { clinic_id },
    order: [['id', 'DESC']],
  });
};

// 🔍 Get Single Bedlocation (clinic wise)
exports.getBedlocationById = async (id, clinic_id) => {
  return await Bedlocation.findOne({
    where: { id, clinic_id },
  });
};

// ✏️ Update Bedlocation (clinic wise)
exports.updateBedlocation = async (id, clinic_id, data) => {
  return await Bedlocation.update(data, {
    where: { id, clinic_id },
  });
};

// 🗑️ Delete Bedlocation (clinic wise)
exports.deleteBedlocation = async (id, clinic_id) => {
  return await Bedlocation.destroy({
    where: { id, clinic_id },
  });
};
