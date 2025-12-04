const { Opd, Daycare, DaycareProcedure, IPDAdmission } = require('../../database/models');

const { Op } = require('sequelize');

exports.searchManagePatients = async (clinic_id, filters) => {
  const { search, from_date, to_date, type } = filters;

  if (!clinic_id) throw new Error('Clinic ID is required');

  let Model;
  let nameField;
  let mobileField;
  let includeOption = [];

  // ------------------------------
  // SELECT MODEL + FIELDS BY TYPE
  // ------------------------------
  if (type === 'OPD') {
    Model = Opd;
    nameField = 'patient_name';
    mobileField = 'mobile_number';
  } else if (type === 'Daycare') {
    Model = Daycare;
    nameField = 'full_name';
    mobileField = 'emergency_contact';

    // Include daycare procedures
    includeOption = [{ model: DaycareProcedure, as: 'procedures' }];
  } else if (type === 'IPD') {
    Model = IPDAdmission;
    nameField = 'patient_name';
    mobileField = 'mobile_number';
  }

  // ------------------------------
  // DATE FILTER
  // ------------------------------
  let whereCondition = {
    clinic_id,
    createdAt: {
      [Op.between]: [from_date + ' 00:00:00', to_date + ' 23:59:59'],
    },
  };

  // ------------------------------
  // SEARCH FILTER (name / mobile / ap_id)
  // ------------------------------
  if (search) {
    whereCondition[Op.or] = [
      { [nameField]: { [Op.like]: `%${search}%` } },
      { [mobileField]: { [Op.like]: `%${search}%` } },
      { ap_id: { [Op.like]: `%${search}%` } },
    ];
  }

  // ------------------------------
  // FINAL QUERY
  // ------------------------------
  return await Model.findAll({
    where: whereCondition,
    include: includeOption,
    order: [['id', 'DESC']],
  });
};
