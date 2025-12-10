const mongoose = require('mongoose');

const SintomaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  variacao_de_nomes: { type: mongoose.Schema.Types.Array, of: String }
}, { timestamps: true });

module.exports = mongoose.model('Sintoma', SintomaSchema);