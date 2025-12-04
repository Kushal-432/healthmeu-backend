const express = require('express');
const router = express.Router();
const {getLoggedInUser} = require('../controllers/user.controller');
const validate = require('../middlewares/validate.middlewares');
const {registerSchema, loginSchema} = require('../validators/user.validators');
const {register,login,forgotPassword,verifyOtp,resetPassword} = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middlewares');

router.post('/register',validate(registerSchema),register);
router.post('/login',validate(loginSchema),login);
router.post('/forgot-password',forgotPassword);
router.post('/verify-otp',verifyOtp);
router.post('/reset-password',resetPassword);

router.use(authMiddleware);
router.get('/me/:id',getLoggedInUser);
module.exports = router;