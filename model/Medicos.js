const mongoose = require('mongoose');

const MedicoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  especialidade: { type: String, required: true },
  numero_ordem: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Medicos', MedicoSchema);
