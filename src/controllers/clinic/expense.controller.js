const { expenseSchema } = require('../../validators/clinic/expense.validator');
const expenseService = require('../../services/clinic/expense.service');
const { successResponse, errorResponse } = require('../../utils/response/response');

// ➕ Create Expense (clinic specific)
exports.createExpense = async (req, res) => {
  try {
    const clinic_id = req.user.id; // 🔥 IMPORTANT: fetch clinic_id from JWT

    // Attach clinic_id to body to validate + save
    req.body.clinic_id = clinic_id;

    const { error } = expenseSchema.validate(req.body);
    if (error) return errorResponse(res, error, error.details[0].message, 400);

    const expense = await expenseService.createExpense(req.body);

    return successResponse(res, expense, 'Expense created successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error creating expense', 500);
  }
};

// 📋 Get all expenses (clinic specific)
exports.getExpenses = async (req, res) => {
  try {
    const clinic_id = req.user.id;

    const data = await expenseService.getAllExpenses(clinic_id);

    return successResponse(res, data, 'Expenses fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching expenses', 500);
  }
};

// 🔍 Get single expense by ID (clinic-wise)
exports.getExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    const data = await expenseService.getExpenseById(id, clinic_id);

    if (!data) return errorResponse(res, null, 'Expense not found', 404);

    return successResponse(res, data, 'Expense fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error fetching expense', 500);
  }
};

// ✏️ Update Expense (clinic specific)
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    // Check if the expense belongs to this clinic
    const existing = await expenseService.getExpenseById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'Expense not found', 404);

    // Add clinic_id before validation
    req.body.clinic_id = clinic_id;

    const { error } = expenseSchema.validate(req.body);
    if (error) return errorResponse(res, error, error.details[0].message, 400);

    await expenseService.updateExpense(id, req.body, clinic_id);

    return successResponse(res, null, 'Expense updated successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error updating expense', 500);
  }
};

// 🗑️ Delete Expense (clinic specific)
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic_id = req.user.id;

    // Check if belongs to current clinic
    const existing = await expenseService.getExpenseById(id, clinic_id);
    if (!existing) return errorResponse(res, null, 'Expense not found', 404);

    await expenseService.deleteExpense(id, clinic_id);

    return successResponse(res, null, 'Expense deleted successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Error deleting expense', 500);
  }
};
