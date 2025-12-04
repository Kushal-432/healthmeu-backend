const { Opd } = require('../../database/models');
const { Op } = require('sequelize');

class ClinicService {
  // -------------------------------------------------------
  // CREATE OPD — Clinic Wise
  // -------------------------------------------------------
  async createOPD(data) {
    // Check clinic id
    if (!data.clinic_id) throw new Error('Clinic ID is required');

    // Step 1: Find last OPD record to generate next AP-ID
    const lastOpd = await Opd.findOne({
      order: [['id', 'DESC']],
    });

    // Step 2: Generate new AP-ID
    let nextNumber = lastOpd ? lastOpd.id + 1 : 1;
    const ap_id = `APD${String(nextNumber).padStart(5, '0')}`;
    // example: APD00001, APD00002, APD00058

    // Step 3: attach ap_id to data
    data.ap_id = ap_id;

    // Step 4: insert data
    return await Opd.create(data);
  }

  // -------------------------------------------------------
  // GET ALL OPD — Clinic Wise
  // -------------------------------------------------------
  async getAllOPD(clinic_id) {
    if (!clinic_id) throw new Error('Clinic ID is required');

    return await Opd.findAll({
      where: { clinic_id },
      order: [['createdAt', 'DESC']],
    });
  }

  // -------------------------------------------------------
  // GET OPD BY ID — Clinic Wise
  // -------------------------------------------------------
  async getOPDById(id, clinic_id) {
    if (!clinic_id) throw new Error('Clinic ID is required');

    return await Opd.findOne({
      where: { id, clinic_id },
    });
  }

  // -------------------------------------------------------
  // UPDATE OPD — Clinic Wise
  // -------------------------------------------------------
  async updateOPD(id, clinic_id, data) {
    if (!clinic_id) throw new Error('Clinic ID is required');

    const opd = await Opd.findOne({ where: { id, clinic_id } });
    if (!opd) return null;

    await opd.update(data);
    return opd;
  }

  // -------------------------------------------------------
  // DELETE OPD — Clinic Wise
  // -------------------------------------------------------
  async deleteOPD(id, clinic_id) {
    if (!clinic_id) throw new Error('Clinic ID is required');

    const opd = await Opd.findOne({ where: { id, clinic_id } });
    if (!opd) return null;

    await opd.destroy();
    return true;
  }
  async filterOPD(data, clinic_id) {
    const { lead_type, search, from_date, to_date } = data;

    if (!clinic_id) {
      throw new Error('Clinic ID is required');
    }

    // Base filter
    let where = {
      clinic_id: clinic_id,
    };

    // Filter by lead_type
    if (lead_type) {
      where.lead_type = lead_type;
    }

    // Filter by search = ap_id OR patient_name OR mobile_number
    if (search) {
      where[Op.or] = [
        { ap_id: { [Op.like]: `%${search}%` } },
        { patient_name: { [Op.like]: `%${search}%` } },
        { mobile_number: { [Op.like]: `%${search}%` } },
      ];
    }

    // Date range filter
    if (from_date && to_date) {
      where.createdAt = {
        [Op.between]: [new Date(from_date), new Date(to_date)],
      };
    }

    // Final fetch
    return await Opd.findAll({
      where,
      order: [['id', 'DESC']],
    });
  }
}

module.exports = new ClinicService();
