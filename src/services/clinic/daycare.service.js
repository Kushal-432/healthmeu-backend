const { Daycare, DaycareProcedure } = require('../../database/models');
const { Op } = require('sequelize');

class DaycareService {
  // -------------------------------------------------------
  // CREATE DAYCARE — Clinic Wise
  // -------------------------------------------------------
  async createDaycare(data) {
    const { procedures, clinic_id, ...daycareData } = data;

    if (!clinic_id) throw new Error('Clinic ID is required');

    // ------------ GENERATE AP ID LIKE DC00001 ------------
    const lastDaycare = await Daycare.findOne({
      where: { clinic_id },
      order: [['id', 'DESC']],
    });

    let nextNumber = 1;

    if (lastDaycare && lastDaycare.ap_id) {
      const lastNumber = parseInt(lastDaycare.ap_id.replace('DC', ''));
      nextNumber = lastNumber + 1;
    }

    const ap_id = `DC${String(nextNumber).padStart(5, '0')}`;
    // ------------------------------------------------------

    // Create daycare with ap_id
    const daycare = await Daycare.create({
      ...daycareData,
      clinic_id,
      ap_id, // <-- IMPORTANT
    });

    // Store procedure list
    if (procedures && procedures.length > 0) {
      const formattedProcedures = procedures.map((p) => ({
        daycare_id: daycare.id,
        procedure_name: p.procedure_name,
        qty: p.qty,
        price: p.price,
        clinic_id,
      }));

      await DaycareProcedure.bulkCreate(formattedProcedures);
    }

    return await Daycare.findOne({
      where: { id: daycare.id, clinic_id },
      include: [{ model: DaycareProcedure, as: 'procedures' }],
    });
  }

  // -------------------------------------------------------
  // GET ALL DAYCARE — Clinic Wise
  // -------------------------------------------------------
  async getAllDaycare(clinic_id) {
    if (!clinic_id) throw new Error('Clinic ID is required');

    return await Daycare.findAll({
      where: { clinic_id },
      include: [{ model: DaycareProcedure, as: 'procedures' }],
      order: [['id', 'DESC']],
    });
  }

  // -------------------------------------------------------
  // GET DAYCARE BY ID — Clinic Wise
  // -------------------------------------------------------
  async getDaycareById(id, clinic_id) {
    if (!clinic_id) throw new Error('Clinic ID is required');

    return await Daycare.findOne({
      where: { id, clinic_id },
      include: [{ model: DaycareProcedure, as: 'procedures' }],
    });
  }

  // -------------------------------------------------------
  // UPDATE DAYCARE — Clinic Wise
  // -------------------------------------------------------
  async updateDaycare(id, clinic_id, data) {
    if (!clinic_id) throw new Error('Clinic ID is required');

    const daycare = await Daycare.findOne({ where: { id, clinic_id } });
    if (!daycare) return null;

    const { procedures, ...daycareData } = data;

    await daycare.update(daycareData);

    // Replace procedure list
    if (procedures) {
      await DaycareProcedure.destroy({ where: { daycare_id: id } });

      const newProcedures = procedures.map((p) => ({
        daycare_id: id,
        procedure_name: p.procedure_name,
        qty: p.qty,
        price: p.price,
      }));

      await DaycareProcedure.bulkCreate(newProcedures);
    }

    return await Daycare.findOne({
      where: { id, clinic_id },
      include: [{ model: DaycareProcedure, as: 'procedures' }],
    });
  }

  // -------------------------------------------------------
  // DELETE DAYCARE — Clinic Wise
  // -------------------------------------------------------
  async deleteDaycare(id, clinic_id) {
    if (!clinic_id) throw new Error('Clinic ID is required');

    const daycare = await Daycare.findOne({ where: { id, clinic_id } });
    if (!daycare) return null;

    await DaycareProcedure.destroy({ where: { daycare_id: id } });
    await Daycare.destroy({ where: { id, clinic_id } });

    return true;
  }
  // SERVICE
  async filterDaycare(data) {
    const { clinic_id, search, date } = data;

    if (!clinic_id) throw new Error('Clinic ID is required');

    // Base condition
    let where = { clinic_id };

    // Search in ONE field (ap_id OR full_name)
    if (search) {
      where[Op.or] = [
        { ap_id: { [Op.like]: `%${search}%` } },
        { full_name: { [Op.like]: `%${search}%` } },
      ];
    }

    // Date filter → all records >= selected date
    if (date) {
      where.createdAt = {
        [Op.gte]: new Date(date),
      };
    }

    // Fetch final data
    return await Daycare.findAll({
      where,
      include: [{ model: DaycareProcedure, as: 'procedures' }],
      order: [['id', 'DESC']],
    });
  }
}

module.exports = new DaycareService();
