// backend/controllers/acudientes.js

const Acudiente = require('../models/Acudiente');

exports.createAcudiente = async (req, res) => {
  try {
    const acudiente = new Acudiente(req.body);
    await acudiente.save();
    res.status(201).json(acudiente);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getAcudientesByPacienteId = async (req, res) => {
  try {
    const acudientes = await Acudiente.find({ paciente: req.params.pacienteId });
    res.json(acudientes);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
