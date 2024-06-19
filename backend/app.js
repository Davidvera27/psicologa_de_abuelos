// backend/app.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

const authRoutes = require('./routes/auth');
const pacienteRoutes = require('./routes/pacientes');
const tiqueterasRoutes = require('./routes/tiqueteras');
const acudienteRoutes = require('./routes/acudientes'); // Asegúrate de que esto esté correcto

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/tiqueteras', tiqueterasRoutes);
app.use('/api/acudientes', acudienteRoutes); // Asegúrate de que esto esté correcto

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
