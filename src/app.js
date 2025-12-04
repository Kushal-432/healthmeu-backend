const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const logger = require('./config/log');
const userRoutes = require('./routes/user.routes');
const clinicRoutes = require('./routes/clinic.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '../public')));

// Application api test url
app.use('/api/v1/test', function (req, res) {
  return res.json({
    message: 'Test successfully',
  });
});
//routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/clinic', clinicRoutes);
module.exports = app;
