const Joi = require('joi');

56;
const ipdSchema = Joi.object({
  clinic_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Clinic ID must be a valid number',
    'number.integer': 'Clinic ID must be an integer',
    'number.positive': 'Clinic ID must be a positive number',
    'any.required': 'Clinic ID is required',
  }),
  // ---- Patient Basic Info ----
  profile_img: Joi.string().optional(),

  abha_number: Joi.string().allow(null, ''),
  abha_address: Joi.string().allow(null, ''),

  adhar_number: Joi.string().required(),
  registration_number: Joi.string().required(),
  mobile_number: Joi.string().required(),

  patient_name: Joi.string().required(),
  dob: Joi.date().optional(),
  age_years: Joi.number().integer().min(0).optional(),
  age_months: Joi.number().integer().min(0).optional(),
  age_days: Joi.number().integer().min(0).optional(),

  gender: Joi.string().allow(null, ''),
  marital_status: Joi.string().allow(null, ''),
  occupation: Joi.string().allow(null, ''),
  religion: Joi.string().allow(null, ''),
  reference_type: Joi.string().allow(null, ''),

  address: Joi.string().allow(null, ''),
  pin: Joi.string().allow(null, ''),
  state: Joi.string().allow(null, ''),
  district: Joi.string().allow(null, ''),
  thana: Joi.string().allow(null, ''),
  tehsil: Joi.string().allow(null, ''),
  block: Joi.string().allow(null, ''),

  // ---- Admission Details ----
  arrival_date: Joi.date().required(),
  arrival_time: Joi.string().required(),
  admission_date: Joi.date().required(),

  provisional_diagnosis: Joi.string().allow(null, ''),
  treatment: Joi.string().allow(null, ''),
  remarks: Joi.string().allow(null, ''),
  icd_code: Joi.string().allow(null, ''),

  refer_by: Joi.string().allow(null, ''),

  blood_group: Joi.string().allow(null, ''),
  blood_sign: Joi.string().allow(null, ''),
  admission_type: Joi.string().allow(null, ''),

  doctor_id: Joi.any().allow(null, ''),
  paramedic_staff: Joi.string().allow(null, ''),

  // ---- Insurance / TPA ----
  insurance_name: Joi.string().allow(null, ''),
  tpa_approved_amount: Joi.string().allow(null, ''),
  insurance_approval: Joi.string().allow(null, ''),

  // ---- Bed Details ----
  bed_type: Joi.string().allow(null, ''),
  bed: Joi.string().allow(null, ''),
  doctor_fees: Joi.string().allow(null, ''),
  total_surgery_cost: Joi.string().allow(null, ''),

  // ---- Emergency Contacts ----
  contact_person1_name: Joi.string().allow(null, ''),
  contact_person1_mobile: Joi.string().allow(null, ''),
  contact_person2_name: Joi.string().allow(null, ''),
  contact_person2_mobile: Joi.string().allow(null, ''),

  // ---- Guardian ----
  guardian_name: Joi.string().allow(null, ''),
  guardian_relation: Joi.string().allow(null, ''),
  guardian_mobile: Joi.string().allow(null, ''),

  // ---- Payer ----
  insurance_company_name: Joi.string().allow(null, ''),
  payer_name: Joi.string().allow(null, ''),
  card_no: Joi.string().allow(null, ''),
  policy_no: Joi.string().allow(null, ''),
  rank: Joi.string().allow(null, ''),
  rate_list: Joi.string().allow(null, ''),
}).unknown(true); // allow future additions

module.exports = { ipdSchema };
