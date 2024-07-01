const express = require('express');
const router = express.Router();
const Paciente = require('../models/Paciente');

// Crear nuevo paciente
router.post('/', async (req, res) => {
  try {
    const { servicioEmi, telefonoEmi, atencionDomiciliaria, diasSeleccionados, ...rest } = req.body;

    // Verifica y ajusta los valores recibidos
    const parsedDiasSeleccionados = JSON.parse(diasSeleccionados); // Parsear los días seleccionados si es necesario

    const newPaciente = new Paciente({
      ...rest,
      diasSeleccionados: parsedDiasSeleccionados,
      telefonoEmi: servicioEmi === 'Sí' ? telefonoEmi : 'N/A',
      atencionDomiciliaria: atencionDomiciliaria === 'Sí' ? 'SÍ' : 'NO'
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
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener un paciente por ID
router.get('/:id', async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.params.id);
    if (!paciente) return res.status(404).json({ message: 'Paciente no encontrado' });
    res.json(paciente);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar un paciente
router.put('/:id', async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.params.id);
    if (!paciente) return res.status(404).send('Paciente no encontrado');

    for (const key in req.body) {
      paciente[key] = req.body[key];
    }

    if (req.body.servicioEmi !== undefined) {
      paciente.telefonoEmi = req.body.servicioEmi === 'Sí' ? req.body.telefonoEmi : 'N/A';
    }

    if (req.body.atencionDomiciliaria !== undefined) {
      paciente.atencionDomiciliaria = req.body.atencionDomiciliaria === 'Sí' ? 'SÍ' : 'NO';
    }

    await paciente.save();
    res.send(paciente);
  } catch (error) {
    console.error('Error al actualizar el paciente:', error); // Depuración
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
    console.error('Error al actualizar el día seleccionado:', error); // Depuración
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
