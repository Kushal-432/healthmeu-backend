const appointmentService = require('../../services/clinic/appointment.service');
const { appointmentValidator } = require('../../validators/clinic/appointment.validator');
const { successResponse, errorResponse } = require('../../utils/response/response');

// -------------------------------------------------------
// CREATE APPOINTMENT
// -------------------------------------------------------
exports.createAppointment = async (req, res) => {
  try {
    // Use req.query because you are sending clinic_id in URL query
    const { clinic_id } = req.query;

    if (!clinic_id) {
      return errorResponse(res, 'clinic_id is required in query params', 422);
    }

    // Validate request body (clinic_id NOT included)
    const { error } = appointmentValidator.validate(req.body);
    if (error) {
      return errorResponse(res, error.details[0].message, 422);
    }

    const result = await appointmentService.createAppointment(clinic_id, req.body);

    return successResponse(res, result, 'Appointment created successfully');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};
