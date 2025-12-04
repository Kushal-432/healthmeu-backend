const { IPDAdmission } = require('../../database/models');
const { Op } = require('sequelize');

class IPDService {
  // ➕ Create an IPD Admission
  async createIPD(data) {
    // Generate AP ID like IPD00001
    const lastRecord = await IPDAdmission.findOne({
      order: [['id', 'DESC']],
    });

    let nextNumber = 1;
    if (lastRecord && lastRecord.ap_id) {
      nextNumber = parseInt(lastRecord.ap_id.replace('IPD', '')) + 1;
    }

    const ap_id = `IPD${String(nextNumber).padStart(5, '0')}`;

    return await IPDAdmission.create({
      ...data,
      ap_id, // store generated ID
    });
  }

  // 📋 Get all IPD Admissions (Clinic-wise)
  async getAllIPD(clinic_id) {
    return await IPDAdmission.findAll({
      where: { clinic_id },
      order: [['id', 'DESC']],
    });
  }

  // 🔍 Get single IPD Admission by ID (Clinic-wise)
  async getIPDById(id, clinic_id) {
    return await IPDAdmission.findOne({
      where: { id, clinic_id },
    });
  }

  // ✏️ Update IPD Admission (Clinic-wise)
  async updateIPD(id, clinic_id, data) {
    const ipd = await IPDAdmission.findOne({
      where: { id, clinic_id },
    });

    if (!ipd) return null;

    await ipd.update(data);
    return ipd;
  }

  // 🗑️ Delete IPD Admission (Clinic-wise)
  async deleteIPD(id, clinic_id) {
    const ipd = await IPDAdmission.findOne({
      where: { id, clinic_id },
    });

    if (!ipd) return null;

    await IPDAdmission.destroy({ where: { id, clinic_id } });
    return true;
  }
  async filterIPD(data, clinic_id) {
    const { search, from_date, to_date } = data;

    if (!clinic_id) {
      throw new Error('Clinic ID is required');
    }

    // Base filter
    let where = {
      clinic_id: clinic_id,
    };

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
    return await IPDAdmission.findAll({
      where,
      order: [['id', 'DESC']],
    });
  }
}

module.exports = new IPDService();
