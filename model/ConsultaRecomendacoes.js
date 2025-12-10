const mongoose = require('mongoose');

const ConsultaRecomendacoes = new mongoose.Schema({
    consulta: { type: mongoose.Schema.Types.ObjectId, ref: 'Consulta', required: true },
    recomendacao: { type: mongoose.Schema.Types.ObjectId, ref: 'Recomendacao', required: true }
}, { timestamps: true });
module.exports = mongoose.model('ConsultaRecomendacoes', ConsultaRecomendacoes);