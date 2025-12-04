const { Expense } = require('../../database/models');

// ➕ Create Expense (clinic-wise)
exports.createExpense = async (data) => {
  return await Expense.create(data);
};

// 📋 Get all Expenses for a specific clinic
exports.getAllExpenses = async (clinic_id) => {
  return await Expense.findAll({
    where: { clinic_id },
    order: [['id', 'DESC']],
  });
};

// 🔍 Get single Expense by ID (clinic-wise)
exports.getExpenseById = async (id, clinic_id) => {
  return await Expense.findOne({
    where: { id, clinic_id },
  });
};

// ✏️ Update Expense (clinic-wise)
exports.updateExpense = async (id, data, clinic_id) => {
  return await Expense.update(data, {
    where: { id, clinic_id },
  });
};

// 🗑️ Delete Expense (clinic-wise)
exports.deleteExpense = async (id, clinic_id) => {
  return await Expense.destroy({
    where: { id, clinic_id },
  });
};
