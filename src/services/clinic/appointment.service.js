const { Appointment, Clinic } = require('../../database/models');

// ➕ Create Appointment (clinic_id from URL)
exports.createAppointment = async (clinic_id, data) => {
  // Check if clinic exists
  const clinic = await Clinic.findOne({ where: { clinic_id: clinic_id } });

  if (!clinic) {
    throw new Error('Clinic not found');
  }

  // Create appointment with clinic ID from URL
  return await Appointment.create({
    ...data,
    clinic_id: clinic.id,
  });
};

// 📋 Get All Appointments (not clinic-wise)
exports.getAllAppointments = async () => {
  return await Appointment.findAll({
    order: [['id', 'DESC']],
  });
};

// 🔍 Get Single Appointment
exports.getAppointmentById = async (id) => {
  return await Appointment.findOne({
    where: { id },
  });
};

// ✏️ Update Appointment
exports.updateAppointment = async (id, data) => {
  return await Appointment.update(data, {
    where: { id },
  });
};

// 🗑️ Delete Appointment
exports.deleteAppointment = async (id) => {
  return await Appointment.destroy({
    where: { id },
  });
};
