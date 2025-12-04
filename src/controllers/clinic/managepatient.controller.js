const { managepatientSearchValidator } = require('../../validators/clinic/managepatient.validator');
const managepatientService = require('../../services/clinic/managepatient.service');
const { successResponse, errorResponse } = require('../../utils/response/response');

exports.searchManagePatients = async (req, res) => {
  try {
    // Validate
    const { error } = managepatientSearchValidator.validate(req.body);
    if (error) return errorResponse(res, error.details[0].message);

    const clinic_id = req.user.id;

    const records = await managepatientService.searchManagePatients(clinic_id, req.body);

    return successResponse(res, records);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};
