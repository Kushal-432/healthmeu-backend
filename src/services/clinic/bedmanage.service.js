const { Bedmanage, Bedtype, Bedlocation } = require('../../database/models');

module.exports = {
  // ➕ CREATE Bedmanage (clinic wise)
  createBedmanage: async (data) => {
    return await Bedmanage.create(data);
  },

  // 📋 GET ALL Bedmanages (clinic wise)
  getAllBedmanages: async (clinic_id) => {
    return await Bedmanage.findAll({
      where: { clinic_id },
      include: [
        { model: Bedtype, as: 'bedtype' },
        { model: Bedlocation, as: 'bedlocation' },
      ],
      order: [['id', 'DESC']],
    });
  },

  // 🔍 GET SINGLE Bedmanage (clinic wise)
  getBedmanageById: async (id, clinic_id) => {
    return await Bedmanage.findOne({
      where: { id, clinic_id },
      include: [
        { model: Bedtype, as: 'bedtype' },
        { model: Bedlocation, as: 'bedlocation' },
      ],
    });
  },

  // ✏️ UPDATE Bedmanage (clinic wise)
  updateBedmanage: async (id, clinic_id, data) => {
    return await Bedmanage.update(data, {
      where: { id, clinic_id },
    });
  },

  // 🗑️ DELETE Bedmanage (clinic wise)
  deleteBedmanage: async (id, clinic_id) => {
    return await Bedmanage.destroy({
      where: { id, clinic_id },
    });
  },
};
