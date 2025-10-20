const mongoose = require('mongoose');

const DoencaMedicamento = new mongoose.Schema({
    doenca: { type: mongoose.Schema.Types.ObjectId, ref: 'Doencas', required: true },
    medicamento: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicamentos', required: true },
    indicacao: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('DoencaMedicamentos', DoencaMedicamento);