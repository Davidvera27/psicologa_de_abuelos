// backend/routes/pacientes.js
const express = require('express');
const router = express.Router();
const { createPaciente, getPacientes } = require('../controllers/pacientes');
const auth = require('../middleware/auth');

router.post('/', auth, createPaciente);
router.get('/', auth, getPacientes);

module.exports = router;
