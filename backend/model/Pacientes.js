const mongoose = require('mongoose');

const PacienteSchema = new mongoose.Schema({
  // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  data_nascimento: { type: Date },
  genero: { type: String, enum: ['M', 'F'] },
  altura: { type: Number },
  peso: { type: Number },
  nome: { type: String, required: true },
  contacto: { type: String },
  endereco: { type: String },
  número_seguranca_social: { type: String },

  documento: { type: String, unique: true },
  documento_identificacao_tipo: { type: String, enum: ['BI', 'CC', 'Passaporte'] },

  predisposicoes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doencas' }],
}, { timestamps: true });

module.exports = mongoose.model('Pacientes', PacienteSchema);
