//backend\controllers\pacientes.js
const Paciente = require('../models/Paciente');

exports.createPaciente = async (req, res) => {
  try {
    const paciente = new Paciente(req.body);
    await paciente.save();
    res.status(201).json(paciente);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
