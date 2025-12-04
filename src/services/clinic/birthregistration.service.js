const { Birthregistration } = require('../../database/models');
const { Op } = require('sequelize');

// -------------------------------------------------------
// CREATE Birth Registration (CLINIC-WISE)
// -------------------------------------------------------
exports.createBirthRegistration = async (data) => {
  if (!data.clinic_id) throw new Error('Clinic ID is required');

  // -------------------------------------------------------
  // GET LAST REGISTRATION ID
  // -------------------------------------------------------
  const lastRecord = await Birthregistration.findOne({
    where: { clinic_id: data.clinic_id },
    order: [['id', 'DESC']],
  });

  // -------------------------------------------------------
  // GENERATE NEXT REG ID LIKE BR00001
  // -------------------------------------------------------
  let nextNumber = 1;

  if (lastRecord && lastRecord.reg_id) {
    const numericPart = parseInt(lastRecord.reg_id.replace('BR', '')) || 0;
    nextNumber = numericPart + 1;
  }

  const reg_id = 'BR' + String(nextNumber).padStart(5, '0');

  // -------------------------------------------------------
  // CREATE RECORD
  // -------------------------------------------------------
  return await Birthregistration.create({
    ...data,
    reg_id,
  });
};

// -------------------------------------------------------
// GET ALL Birth Registrations (CLINIC-WISE)
// -------------------------------------------------------
exports.getAllBirthRegistrations = async (clinic_id) => {
  if (!clinic_id) throw new Error('Clinic ID is required');

  return await Birthregistration.findAll({
    where: { clinic_id },
    order: [['id', 'DESC']],
  });
};

// -------------------------------------------------------
// GET SINGLE Birth Registration (CLINIC-WISE)
// -------------------------------------------------------
exports.getBirthRegistrationById = async (id, clinic_id) => {
  if (!clinic_id) throw new Error('Clinic ID is required');

  return await Birthregistration.findOne({
    where: { id, clinic_id },
  });
};

// -------------------------------------------------------
// UPDATE Birth Registration (CLINIC-WISE)
// -------------------------------------------------------
exports.updateBirthRegistration = async (id, clinic_id, data) => {
  if (!clinic_id) throw new Error('Clinic ID is required');

  const record = await Birthregistration.findOne({
    where: { id, clinic_id },
  });

  if (!record) return null;

  await record.update(data);
  return record;
};

// -------------------------------------------------------
// DELETE Birth Registration (CLINIC-WISE)
// -------------------------------------------------------
exports.deleteBirthRegistration = async (id, clinic_id) => {
  if (!clinic_id) throw new Error('Clinic ID is required');

  return await Birthregistration.destroy({
    where: { id, clinic_id },
  });
};

exports.searchBirthRegistration = async (clinic_id, filters) => {
  const { search, date } = filters;

  if (!clinic_id) throw new Error('Clinic ID is required');

  let whereCondition = { clinic_id };

  // Date filter
  if (date) {
    whereCondition.date = date; // exact match
  }

  // search = baby_name or reg_id in ONE FIELD
  if (search) {
    whereCondition[Op.or] = [
      { baby_name: { [Op.like]: `%${search}%` } },
      { reg_id: { [Op.like]: `%${search}%` } },
    ];
  }

  return await Birthregistration.findAll({
    where: whereCondition,
    order: [['id', 'DESC']],
  });
};
