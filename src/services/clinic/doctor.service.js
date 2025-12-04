const { Doctor } = require('../../database/models');

// ➕ CREATE DOCTOR (clinic wise)
exports.createDoctor = async (data) => {
  return await Doctor.create(data);
};

// 📋 GET ALL DOCTORS (clinic wise)
exports.getAllDoctors = async (clinic_id) => {
  return await Doctor.findAll({
    where: { clinic_id },
    order: [['id', 'DESC']],
  });
};

// 🔍 GET SINGLE DOCTOR (clinic wise)
exports.getDoctorById = async (id, clinic_id) => {
  return await Doctor.findOne({
    where: { id, clinic_id },
  });
};

// ✏️ UPDATE DOCTOR (clinic wise)
exports.updateDoctor = async (id, clinic_id, data) => {
  // Fetch doctor for this clinic
  const doctor = await Doctor.findOne({ where: { id, clinic_id } });
  if (!doctor) return null;

  // Apply updated fields (Sequelize will detect if password changed)
  doctor.set(data);

  // Save → triggers beforeUpdate hook → hashes password if changed
  await doctor.save();

  return Doctor.findOne({ where: { id, clinic_id } });
};

// 🗑️ DELETE DOCTOR (clinic wise)
exports.deleteDoctor = async (id, clinic_id) => {
  return await Doctor.destroy({
    where: { id, clinic_id },
  });
};
