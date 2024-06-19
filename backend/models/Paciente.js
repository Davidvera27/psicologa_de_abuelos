// backend/models/Paciente.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PacienteSchema = new Schema({
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  edad: { type: Number, required: true },
  documento: { type: String, required: true },
  rh: { type: String, required: true },
  tiquetera: { type: String, required: true },
  estadoTiquetera: { type: String, required: true },
  contacto: { type: String, required: true },
  direccion: { type: String, required: true }
});

module.exports = mongoose.model('Paciente', PacienteSchema);
