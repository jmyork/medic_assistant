const mongoose = require('mongoose');

const DoencasRecomendacoes = new mongoose.Schema({
    doenca: { type: mongoose.Schema.Types.ObjectId, ref: 'Doencas', required: true },
    recomendacao: { type: mongoose.Schema.Types.ObjectId, ref: 'Recomendacao', required: true }
}, { timestamps: true });

module.exports = mongoose.model('DoencasRecomendacoes', DoencasRecomendacoes);