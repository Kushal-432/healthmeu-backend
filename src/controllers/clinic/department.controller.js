const { departmentValidator } = require('../../validators/clinic/department.validator');
const departmentService = require('../../services/clinic/department.service');
const { successResponse, errorResponse } = require('../../utils/response/response');

// ➕ Create Department (POST /add-department)
exports.createDepartment = async (req, res) => {
  try {
    const clinic_id = req.user.id;
    req.body.clinic_id = clinic_id;

    const { error } = departmentValidator.validate(req.body);
    if (error) return errorResponse(res, error, error.details[0].message, 400);

    const department = await departmentService.createDepartment(req.body);
    return successResponse(res, department, 'Department created successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error creating Department', 500);
  }
};

// 📋 Get All Departments (GET /get-department)
exports.getAllDepartments = async (req, res) => {
  try {
    const clinic_id = req.user.id;
    const data = await departmentService.getAllDepartments(clinic_id);
    return successResponse(res, data, 'Departments fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching Departments', 500);
  }
};

// 🔍 Get Single Department by ID (GET /get-single-department/:id)
exports.getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const department = await departmentService.getDepartmentById(id, clinic_id);
    if (!department) return errorResponse(res, null, 'Department not found', 404);

    return successResponse(res, department, 'Department fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching Department', 500);
  }
};

// ✏️ Update Department (PUT /update-department/:id)
exports.updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await departmentService.getDepartmentById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'Department not found', 404);

    req.body.clinic_id = clinic_id;

    const { error } = departmentValidator.validate(req.body);
    if (error) return errorResponse(res, error, error.details[0].message, 400);

    await departmentService.updateDepartment(id, clinic_id, req.body);
    return successResponse(res, null, 'Department updated successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error updating Department', 500);
  }
};

// 🗑️ Delete Department (DELETE /delete-department/:id)
exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const existing = await departmentService.getDepartmentById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'Department not found', 404);

    await departmentService.deleteDepartment(id, clinic_id);
    return successResponse(res, null, 'Department deleted successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error deleting Department', 500);
  }
};
