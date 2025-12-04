const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  auth: {
    user: config.email.user,
    pass: config.email.pass
  }
});

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"My Goals" <${config.email.user}>`,
      to,
      subject,
      html
    });
    console.log(`Email sent to ${to}`);
  } catch (err) {
    console.error('Error sending email:', err);
  }
};

// Send OTP email with HTML template
const sendOtpEmail = async (to, otp) => {
  const templatePath = path.join(__dirname, 'mail_templetes', 'otp.html');
  let template = fs.readFileSync(templatePath, 'utf-8');

  // Replace placeholder with actual OTP
  template = template.replace('{{OTP_CODE}}', otp);

  await sendEmail(to, 'Your OTP Code', template);
};

module.exports = { sendEmail, sendOtpEmail };
