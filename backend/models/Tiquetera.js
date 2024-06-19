// models/Tiquetera.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TiqueteraSchema = new Schema({
  tipo: { type: String, required: true },
  dias: { type: Number, required: true },
  usuario: { type: Schema.Types.ObjectId, ref: 'user' },
  fechaInicio: { type: Date, default: Date.now },
  fechaFin: { type: Date }
});

module.exports = mongoose.model('tiquetera', TiqueteraSchema);
