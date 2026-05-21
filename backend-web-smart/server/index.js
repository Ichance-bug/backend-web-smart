// Entry point for the Express application.
// Sets up global middleware, mounts all routes, and starts the server.
// Sequelize models are defined but no DB connection is made here.

const express = require('express');
const helmet  = require('helmet');
const cors    = require('cors');

const config              = require('./config/env');
const errorHandler        = require('./middleware/errorHandler');

const authRoutes          = require('./routes/authRoutes');
const adminRoutes         = require('./routes/adminRoutes');
const enrollmentRoutes    = require('./routes/enrollmentRoutes');
const gradesRoutes        = require('./routes/gradesRoutes');
const attendanceRoutes    = require('./routes/attendanceRoutes');
const paymentsRoutes      = require('./routes/paymentsRoutes');
const documentsRoutes     = require('./routes/documentsRoutes');
const notificationsRoutes = require('./routes/notificationsRoutes');

const app = express();

// --- Global Middleware ---
app.use(helmet());
app.use(cors());
app.use(express.json());

// --- Health Check ---
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// --- Route Mounts ---
app.use('/api/auth',          authRoutes);
app.use('/api/admin',         adminRoutes);
app.use('/api/enrollment',    enrollmentRoutes);
app.use('/api/grades',        gradesRoutes);
app.use('/api/attendance',    attendanceRoutes);
app.use('/api/payments',      paymentsRoutes);
app.use('/api/documents',     documentsRoutes);
app.use('/api/notifications', notificationsRoutes);

// --- Global Error Handler (must be last) ---
app.use(errorHandler);

// --- Start Server ---
const PORT = config.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} [${config.NODE_ENV}]`);
});

module.exports = app;
