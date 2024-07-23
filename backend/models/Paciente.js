const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diaSchema = new Schema({
  dia: String,
  seleccionado: Boolean
});

const pacienteSchema = new Schema({
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  lugarNacimiento: { type: String },
  documento: { type: String },
  rh: { type: String },
  genero: { type: String },
  imagenPerfil: { type: String },
  nivelEducativo: { type: String },
  tiquetera: { type: String },
  estadoTiquetera: { type: String },
  fechaIngreso: { type: Date, required: true },
  fechaVencimiento: { type: Date },
  valorPagado: { type: Number },
  totalPagado: { type: Number },
  totalDiasUsados: { type: Number, default: 0 },
  diasRestantes: { type: Number },
  fechaTerminacion: { type: Date },
  contacto: { type: String },
  telefono2: { type: String },
  direccion: { type: String },
  barrio: { type: String },
  apartamentoInterior: { type: String },
  diagnostico: { type: String },
  estadoCivil: { type: String },
  epsSisen: { type: String },
  medicamentos: [
    {
      name: { type: String },
      checked: { type: Boolean }
    }
  ],
  alimentacion: { type: String },
  restricciones: { type: String },
  acudienteNombre: { type: String },
  acudienteApellidos: { type: String },
  acudienteDocumento: { type: String },
  acudienteTelefono: { type: String },
  acudienteEmail: { type: String },
  acudienteParentesco: { type: String },
  motivoConsulta: { type: String },
  antecedentesAtencionIntegral: { type: String },
  antecedentesMedicos: { type: String },
  diagnosticoMedicoPsicologico: { type: String },
  antecedentesFamiliares: { type: String },
  antecedentesTratamiento: { type: String },
  areaComportamiento: { type: String },
  servicioEmi: { type: String, enum: ['Sí', 'No'], default: 'No' },
  telefonoEmi: { type: String },
  atencionDomiciliaria: { type: String, enum: ['Sí', 'No'], default: 'No' },
  servicioTransporte: { type: String, enum: ['Sí', 'No'], default: 'No' },
  horaRecogida: { type: String },
  diasSeleccionados: [diaSchema],
  observaciones: { type: String },
  estado: { type: String, enum: ['Activo', 'Inactivo', 'Suspendido'], default: 'Activo' },
  docIdentidad: { type: String }, // Nuevo campo para documento de identidad
  historiaClinica: { type: String } // Nuevo campo para historia clínica
});

pacienteSchema.virtual('edad').get(function () {
  const today = new Date();
  const birthDate = new Date(this.fechaNacimiento);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

pacienteSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Paciente', pacienteSchema);
