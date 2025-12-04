const { Billheader } = require('../../database/models');

// ➕ Create Billheader (clinic wise)
exports.createBillheader = async (data) => {
  return await Billheader.create(data);
};

// 📋 Get All Billheaders - Clinic Wise
exports.getAllBillheaders = async (clinic_id) => {
  return await Billheader.findAll({
    where: { clinic_id },
    order: [['id', 'DESC']],
  });
};

// 🔍 Get Single Billheader (clinic wise)
exports.getBillheaderById = async (id, clinic_id) => {
  return await Billheader.findOne({
    where: { id, clinic_id },
  });
};

// ✏️ Update Billheader (clinic wise)
exports.updateBillheader = async (id, clinic_id, data) => {
  return await Billheader.update(data, {
    where: { id, clinic_id },
  });
};

// 🗑️ Delete Billheader (clinic wise)
exports.deleteBillheader = async (id, clinic_id) => {
  return await Billheader.destroy({
    where: { id, clinic_id },
  });
};
