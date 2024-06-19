// backend/routes/acudientes.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AcudienteSchema = new Schema({
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  documento: { type: String, required: true },
  parentezco: { type: String, required: true },
  telefono: { type: String, required: true },
  direccion: { type: String, required: true },
  ciudad: { type: String, required: true },
  paciente: { type: Schema.Types.ObjectId, ref: 'Paciente' }
});

module.exports = mongoose.model('Acudiente', AcudienteSchema);
