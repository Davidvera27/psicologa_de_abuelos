const express = require('express');
const router = express.Router();
const Paciente = require('../models/Paciente');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    cb(null, `${req.params.id}${fileExt}`); // Nombre basado en el ID del paciente
  },
});

const upload = multer({ storage });

// Crear nuevo paciente
router.post('/', async (req, res) => {
  try {
    const { servicioEmi, telefonoEmi, atencionDomiciliaria, servicioTransporte, horaRecogida, diasSeleccionados, ...rest } = req.body;

    const parsedDiasSeleccionados = JSON.parse(diasSeleccionados);

    const fechaIngreso = new Date(rest.fechaIngreso);
    const fechaVencimiento = new Date(fechaIngreso);
    fechaVencimiento.setMonth(fechaVencimiento.getMonth() + 1);

    const newPaciente = new Paciente({
      ...rest,
      servicioEmi: servicioEmi || 'No',
      telefonoEmi: servicioEmi === 'Sí' ? telefonoEmi : 'N/A',
      atencionDomiciliaria: atencionDomiciliaria === 'Sí' ? 'Sí' : 'No',
      servicioTransporte: servicioTransporte === 'Sí' ? 'Sí' : 'No',
      horaRecogida: servicioTransporte === 'Sí' ? horaRecogida : 'N/A',
      diasSeleccionados: parsedDiasSeleccionados,
      fechaVencimiento: fechaVencimiento,
      diasRestantes: parsedDiasSeleccionados.length,
      fechaTerminacion: fechaVencimiento
    });

    await newPaciente.save();

    res.status(201).json(newPaciente);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener todos los pacientes
router.get('/', async (req, res) => {
  try {
    const pacientes = await Paciente.find().lean();
    pacientes.forEach(paciente => {
      paciente.edad = paciente.fechaNacimiento ? new Date().getFullYear() - new Date(paciente.fechaNacimiento).getFullYear() : null;
      paciente.diasRestantes = paciente.diasSeleccionados.length - paciente.totalDiasUsados;
    });
    res.json(pacientes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener un paciente por ID
router.get('/:id', async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.params.id).lean();
    if (!paciente) return res.status(404).json({ message: 'Paciente no encontrado' });
    paciente.edad = paciente.fechaNacimiento ? new Date().getFullYear() - new Date(paciente.fechaNacimiento).getFullYear() : null;
    paciente.diasRestantes = paciente.diasSeleccionados.length - paciente.totalDiasUsados;
    res.json(paciente);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para actualizar el paciente incluyendo la imagen
router.put('/:id', upload.single('imagenPerfil'), async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.params.id);
    if (!paciente) return res.status(404).send('Paciente no encontrado');

    // Actualizar campos del paciente
    Object.keys(req.body).forEach(key => {
      if (key === 'diasSeleccionados') {
        paciente[key] = JSON.parse(req.body[key]); // Parsear los días seleccionados
      } else {
        paciente[key] = req.body[key];
      }
    });

    if (req.file) {
      paciente.imagenPerfil = req.file.filename;
    }

    const updatedPaciente = await paciente.save();
    res.json(updatedPaciente);
  } catch (error) {
    console.error('Error al actualizar el paciente:', error);
    res.status(500).send('Error al actualizar el paciente');
  }
});

// Actualizar días seleccionados de un paciente
router.put('/:id/dias/:diaId', async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.params.id);
    if (!paciente) return res.status(404).send('Paciente no encontrado');

    const diaIndex = paciente.diasSeleccionados.findIndex(dia => dia._id.toString() === req.params.diaId);
    if (diaIndex === -1) return res.status(404).send('Día no encontrado');

    paciente.diasSeleccionados[diaIndex].start = req.body.start;
    paciente.diasSeleccionados[diaIndex].end = req.body.end;

    await paciente.save();
    res.send(paciente);
  } catch (error) {
    console.error('Error al actualizar el día seleccionado:', error);
    res.status(500).send('Error al actualizar el día seleccionado');
  }
});

// Eliminar un paciente
router.delete('/:id', async (req, res) => {
  try {
    await Paciente.findByIdAndDelete(req.params.id);
    res.json({ message: 'Paciente eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
