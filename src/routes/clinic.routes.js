const express = require('express');
const router = express.Router();

const clinicController = require('../controllers/clinic.controller');
const validate = require('../middlewares/validate.middlewares');
const authMiddleware = require('../middlewares/auth.middlewares');
const opdController = require('../controllers/clinic/opd.controller');
const daycareController = require('../controllers/clinic/daycare.controller');
const ipdController = require('../controllers/clinic/ipd.controller');
const expenseController = require('../controllers/clinic/expense.controller');
const bedtypeController = require('../controllers/clinic/bedtype.controller');
const bedlocationController = require('../controllers/clinic/bedlocation.controller');
const bedmanageController = require('../controllers/clinic/bedmanage.controller');
const doctorController = require('../controllers/clinic/doctor.controller');
const managePrescriptionController = require('../controllers/clinic/manageprescription.controller');
const staffController = require('../controllers/clinic/staff.controller');
const diseaseController = require('../controllers/clinic/disease.controller');
const diagnosisController = require('../controllers/clinic/dignosis.controller');
const medicineController = require('../controllers/clinic/medicine.controller');
const appointmentController = require('../controllers/clinic/appointment.controller');
const clinicHeaderFooterController = require('../controllers/clinic/clinicHeaderFooter.controller');
const billheaderController = require('../controllers/clinic/billheader.controller');
const procedureController = require('../controllers/clinic/procedure.controller');
const departmentController = require('../controllers/clinic/department.controller');
const paramedicStaffController = require('../controllers/clinic/paramedicstaff.controller');
const tpaController = require('../controllers/clinic/tpa.controller');
const refererController = require('../controllers/clinic/referer.controller');
const surgerytypeController = require('../controllers/clinic/surgerytype.controller');
const manageserviceController = require('../controllers/clinic/manageservice.controller');
const managedocumentController = require('../controllers/clinic/managedocument.controller');
const vitalmasterController = require('../controllers/clinic/vitalmaster.controller');
const managepatientController = require('../controllers/clinic/managepatient.controller');
const birthRegistrationController = require('../controllers/clinic/birthregistration.controller');

const {
  registerSchema,
  loginSchema,
  changePasswordSchema,
} = require('../validators/clinic.validators');

// ✅ Clinic Register Route
router.post('/register', validate(registerSchema), clinicController.registerClinic);
router.post('/login', validate(loginSchema), clinicController.loginClinic);
// CREATE appointment (clinic_id comes from URL)
router.post('/add-appointments', appointmentController.createAppointment);

router.use(authMiddleware);
router.post('/change-password', validate(changePasswordSchema), clinicController.changePassword);
router.get('/get-profile', clinicController.getProfile);

router.post('/opd', opdController.createOPD);
router.get('/get-opd', opdController.getAllOPD);
router.get('/get-single-opd/:id', opdController.getOPDById);
router.post('/update-opd/:id', opdController.updateOPD);
router.delete('/delete-opd/:id', opdController.deleteOPD);
router.post('/filter-opd', opdController.filterOPD);

router.post('/add-daycare', daycareController.createDaycare);
router.get('/get-daycare', daycareController.getAllDaycare);
router.get('/get-single-daycare/:id', daycareController.getDaycareById);
router.post('/update-daycare/:id', daycareController.updateDaycare);
router.delete('/delete-daycare/:id', daycareController.deleteDaycare);
router.post('/filter-daycare', daycareController.filterDaycare);

router.post('/add-ipd', ipdController.createIPD);
router.get('/get-ipd', ipdController.getAllIPD);
router.get('/get-single-ipd/:id', ipdController.getIPDById);
router.post('/update-ipd/:id', ipdController.updateIPD);
router.delete('/delete-ipd/:id', ipdController.deleteIPD);
router.post('/filter-ipd', ipdController.filterIPD);

router.post('/add-expense', expenseController.createExpense);
router.get('/get-expense', expenseController.getExpenses);
router.get('/get-single-expense/:id', expenseController.getExpense);
router.post('/update-expense/:id', expenseController.updateExpense);
router.delete('/delete-expense/:id', expenseController.deleteExpense);

router.post('/add-bedtype', bedtypeController.createBedtype);
router.get('/get-bedtype', bedtypeController.getAllBedtypes);
router.get('/get-single-bedtype/:id', bedtypeController.getBedtypeById);
router.post('/update-bedtype/:id', bedtypeController.updateBedtype);
router.delete('/delete-bedtype/:id', bedtypeController.deleteBedtype);

router.post('/add-bedlocation', bedlocationController.createBedlocation);
router.get('/get-bedlocation', bedlocationController.getAllBedlocations);
router.get('/get-single-bedlocation/:id', bedlocationController.getBedlocationById);
router.post('/update-bedlocation/:id', bedlocationController.updateBedlocation);
router.delete('/delete-bedlocation/:id', bedlocationController.deleteBedlocation);

router.post('/add-bedmanage', bedmanageController.createBedmanage);
router.get('/get-bedmanage', bedmanageController.getAllBedmanages);
router.post('/update-bedmanage/:id', bedmanageController.updateBedmanage);
router.get('/get-single-bedmanage/:id', bedmanageController.getBedmanageById);
router.delete('/delete-bedmanage/:id', bedmanageController.deleteBedmanage);

router.post('/add-doctor', doctorController.createDoctor);
router.get('/get-doctors', doctorController.getAllDoctors);
router.get('/get-doctor/:id', doctorController.getDoctorById);
router.post('/update-doctor/:id', doctorController.updateDoctor);
router.delete('/delete-doctor/:id', doctorController.deleteDoctor);

router.post('/add-manageprescription', managePrescriptionController.createManagePrescription);
router.get('/get-manageprescription', managePrescriptionController.getManagePrescription);
router.get(
  '/get-single-manageprescription/:id',
  managePrescriptionController.getSingleManagePrescription
);
router.post(
  '/update-manageprescription/:id',
  managePrescriptionController.updateManagePrescription
);
router.delete(
  '/delete-manageprescription/:id',
  managePrescriptionController.deleteManagePrescription
);

router.post('/add-staff', staffController.createStaff);
router.get('/get-staff', staffController.getAllStaff);
router.get('/get-single-staff/:id', staffController.getStaffById);
router.post('/update-staff/:id', staffController.updateStaff);
router.delete('/delete-staff/:id', staffController.deleteStaff);

router.post('/add-disease', diseaseController.createDisease);
router.get('/get-disease', diseaseController.getAllDisease);
router.get('/get-single-disease/:id', diseaseController.getDiseaseById);
router.post('/update-disease/:id', diseaseController.updateDisease);
router.delete('/delete-disease/:id', diseaseController.deleteDisease);

router.post('/add-dignosis', diagnosisController.createDiagnosis);
router.get('/get-dignosis', diagnosisController.getAllDiagnosis);
router.get('/get-single-dignosis/:id', diagnosisController.getDiagnosisById);
router.post('/update-dignosis/:id', diagnosisController.updateDiagnosis);
router.delete('/delete-dignosis/:id', diagnosisController.deleteDiagnosis);

router.post('/add-medicine', medicineController.createMedicine);
router.get('/get-medicine', medicineController.getAllMedicine);
router.get('/get-single-medicine/:id', medicineController.getMedicineById);
router.post('/update-medicine/:id', medicineController.updateMedicine);
router.delete('/delete-medicine/:id', medicineController.deleteMedicine);

router.post('/add-header-footer', clinicHeaderFooterController.createHeaderFooter);
router.get('/get-header-footer', clinicHeaderFooterController.getAllHeaderFooters);
router.get('/get-single-header-footer/:id', clinicHeaderFooterController.getHeaderFooterById);
router.post('/update-header-footer/:id', clinicHeaderFooterController.updateHeaderFooter);
router.delete('/delete-header-footer/:id', clinicHeaderFooterController.deleteHeaderFooter);

router.post('/add-billheader', billheaderController.createBillheader);
router.get('/get-billheader', billheaderController.getAllBillheaders);
router.get('/get-single-billheader/:id', billheaderController.getBillheaderById);
router.post('/update-billheader/:id', billheaderController.updateBillheader);
router.delete('/delete-billheader/:id', billheaderController.deleteBillheader);

router.post('/add-procedure', procedureController.createProcedure);
router.get('/get-procedure', procedureController.getAllProcedures);
router.get('/get-single-procedure/:id', procedureController.getProcedureById);
router.post('/update-procedure/:id', procedureController.updateProcedure);
router.delete('/delete-procedure/:id', procedureController.deleteProcedure);

router.post('/add-department', departmentController.createDepartment);
router.get('/get-department', departmentController.getAllDepartments);
router.get('/get-single-department/:id', departmentController.getDepartmentById);
router.post('/update-department/:id', departmentController.updateDepartment);
router.delete('/delete-department/:id', departmentController.deleteDepartment);

router.post('/add-paramedic-staff', paramedicStaffController.createParamedicStaff);
router.get('/get-paramedic-staff', paramedicStaffController.getAllParamedicStaff);
router.get('/get-single-paramedic-staff/:id', paramedicStaffController.getParamedicStaffById);
router.post('/update-paramedic-staff/:id', paramedicStaffController.updateParamedicStaff);
router.delete('/delete-paramedic-staff/:id', paramedicStaffController.deleteParamedicStaff);

router.post('/add-tpa', tpaController.createTPA);
router.get('/get-tpa', tpaController.getAllTPA);
router.get('/get-single-tpa/:id', tpaController.getTPAById);
router.post('/update-tpa/:id', tpaController.updateTPA);
router.delete('/delete-tpa/:id', tpaController.deleteTPA);

router.post('/add-referer', refererController.createReferer);
router.get('/get-referer', refererController.getAllReferers);
router.get('/get-single-referer/:id', refererController.getRefererById);
router.post('/update-referer/:id', refererController.updateReferer);
router.delete('/delete-referer/:id', refererController.deleteReferer);

router.post('/add-surgerytype', surgerytypeController.createSurgerytype);
router.get('/get-surgerytypes', surgerytypeController.getAllSurgerytypes);
router.get('/get-single-surgerytype/:id', surgerytypeController.getSurgerytypeById);
router.post('/update-surgerytype/:id', surgerytypeController.updateSurgerytype);
router.delete('/delete-surgerytype/:id', surgerytypeController.deleteSurgerytype);

router.post('/add-manageservice', manageserviceController.createManageservice);
router.get('/get-manageservice', manageserviceController.getAllManageservices);
router.get('/get-single-manageservice/:id', manageserviceController.getManageserviceById);
router.post('/update-manageservice/:id', manageserviceController.updateManageservice);
router.delete('/delete-manageservice/:id', manageserviceController.deleteManageservice);

router.post('/add-managedocument', managedocumentController.createManagedocument);
router.get('/get-managedocument', managedocumentController.getAllManagedocuments);
router.get('/get-single-managedocument/:id', managedocumentController.getManagedocumentById);
router.post('/update-managedocument/:id', managedocumentController.updateManagedocument);
router.delete('/delete-managedocument/:id', managedocumentController.deleteManagedocument);

router.post('/add-vitalmaster', vitalmasterController.createVitalmaster);
router.get('/get-vitalmaster', vitalmasterController.getAllVitalmasters);
router.get('/get-single-vitalmaster/:id', vitalmasterController.getVitalmasterById);
router.post('/update-vitalmaster/:id', vitalmasterController.updateVitalmaster);
router.delete('/delete-vitalmaster/:id', vitalmasterController.deleteVitalmaster);

router.post('/search-patient', managepatientController.searchManagePatients);

router.post('/add-birth-registration', birthRegistrationController.createBirthRegistration);
router.get('/get-birth-registrations', birthRegistrationController.getAllBirthRegistrations);
router.get(
  '/get-single-birth-registration/:id',
  birthRegistrationController.getBirthRegistrationById
);
router.post('/update-birth-registration/:id', birthRegistrationController.updateBirthRegistration);
router.delete(
  '/delete-birth-registration/:id',
  birthRegistrationController.deleteBirthRegistration
);
router.delete(
  '/delete-birth-registration/:id',
  birthRegistrationController.deleteBirthRegistration
);
router.post('/filter-birth-registration', birthRegistrationController.searchBirthRegistration);

module.exports = router;
