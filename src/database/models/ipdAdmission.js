module.exports = (sequelize, DataTypes) => {
  const IPDAdmission = sequelize.define(
    'IPDAdmission',
    {
      clinic_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      profile_img: DataTypes.STRING, // ✅ ADDED
      ap_id: DataTypes.STRING, // ✅ ADDED

      abha_number: DataTypes.STRING,
      abha_address: DataTypes.STRING,

      adhar_number: { type: DataTypes.STRING, allowNull: false },
      registration_number: { type: DataTypes.STRING, allowNull: false },
      mobile_number: { type: DataTypes.STRING, allowNull: false },

      patient_name: { type: DataTypes.STRING, allowNull: false },
      dob: DataTypes.DATEONLY,
      age_years: DataTypes.INTEGER,
      age_months: DataTypes.INTEGER,
      age_days: DataTypes.INTEGER,

      gender: DataTypes.STRING,
      marital_status: DataTypes.STRING,
      occupation: DataTypes.STRING,
      religion: DataTypes.STRING,
      reference_type: DataTypes.STRING,

      address: DataTypes.TEXT,
      pin: DataTypes.STRING,
      state: DataTypes.STRING,
      district: DataTypes.STRING,
      thana: DataTypes.STRING,
      tehsil: DataTypes.STRING,
      block: DataTypes.STRING,

      arrival_date: DataTypes.DATEONLY,
      arrival_time: DataTypes.STRING,
      admission_date: DataTypes.DATEONLY,

      provisional_diagnosis: DataTypes.TEXT,
      treatment: DataTypes.TEXT,
      remarks: DataTypes.TEXT,

      icd_code: DataTypes.STRING,
      refer_by: DataTypes.STRING,

      blood_group: DataTypes.STRING,
      blood_sign: DataTypes.STRING,
      admission_type: DataTypes.STRING,

      doctor_id: DataTypes.INTEGER,
      paramedic_staff: DataTypes.STRING,

      insurance_name: DataTypes.STRING,
      tpa_approved_amount: DataTypes.STRING,
      insurance_approval: DataTypes.STRING,

      bed_type: DataTypes.STRING,
      bed: DataTypes.STRING,
      doctor_fees: DataTypes.STRING,
      total_surgery_cost: DataTypes.STRING,

      contact_person1_name: DataTypes.STRING,
      contact_person1_mobile: DataTypes.STRING,
      contact_person2_name: DataTypes.STRING,
      contact_person2_mobile: DataTypes.STRING,

      guardian_name: DataTypes.STRING,
      guardian_relation: DataTypes.STRING,
      guardian_mobile: DataTypes.STRING,

      insurance_company_name: DataTypes.STRING,
      payer_name: DataTypes.STRING,
      card_no: DataTypes.STRING,
      policy_no: DataTypes.STRING,
      rank: DataTypes.STRING,
      rate_list: DataTypes.STRING,
    },
    {
      tableName: 'ipd_admissions',
      timestamps: true,
    }
  );

  return IPDAdmission;
};
