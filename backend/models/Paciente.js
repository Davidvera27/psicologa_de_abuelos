const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pacienteSchema = new Schema({
  nombre: { type: String, required: true },
  apellidos: { type: String },
  fechaNacimiento: { type: Date },
  lugarNacimiento: { type: String },
  documento: { type: String },
  rh: { type: String },
  nivelEducativo: { type: String },
  tiquetera: { type: String },
  estadoTiquetera: { type: String },
  fechaIngreso: { type: Date },
  fechaVencimiento: { type: Date },
  contacto: { type: String },
  telefono2: { type: String },
  direccion: { type: String },
  barrio: { type: String },
  apartamentoInterior: { type: String },
  diagnostico: { type: String },
  estadoCivil: { type: String },
  epsSisen: { type: String },
  medicamentos: { type: [String] },
  alimentacion: { type: String },
  restricciones: { type: String },
  acudienteNombre: { type: String },
  acudienteApellidos: { type: String },
  acudienteDocumento: { type: String },
  acudienteTelefono: { type: String },
  acudienteTelefono2: { type: String },
  acudienteDireccion: { type: String },
  acudienteApartamentoInterior: { type: String },
  acudienteTrabajoDireccion: { type: String },
  acudienteOficina: { type: String },
  acudienteParentesco: { type: String },
  telefonoEmi: { type: String },
  atencionDomiciliaria: { type: String },
  diasSeleccionados: [{
    start: { type: Date },
    end: { type: Date }
  }]
});

module.exports = mongoose.model('Paciente', pacienteSchema);
