// backend/routes/acudientes.js
const express = require('express');
const router = express.Router();
const { createAcudiente, getAcudientesByPacienteId } = require('../controllers/acudientes');
const auth = require('../middleware/auth');

router.post('/', auth, createAcudiente);
router.get('/paciente/:pacienteId', auth, getAcudientesByPacienteId);

module.exports = router;
