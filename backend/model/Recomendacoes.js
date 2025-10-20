const mongoose = require('mongoose');

const PacienteRecomendacaoSchema = new mongoose.Schema({
 nome: { type: String, required: true },
 descricao: { type: String },
 variacao_de_nomes: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Recomendacoes', PacienteRecomendacaoSchema);
