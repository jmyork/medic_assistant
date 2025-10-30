const mongoose = require('mongoose');

const ConsultaMedicamento = new mongoose.Schema({
    consulta: { type: mongoose.Schema.Types.ObjectId, ref: 'Consulta', required: true },
    medicamento: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicamentos', required: true },
    dosagem: { type: String },
    dosagem_unidade: {type: String,enum: ['mg', 'g', 'ml', 'UI', 'comprimidos', 'capsulas', 'colher de chá', 'colher de sopa', 'outro']},
    via_administracao: {type: String,enum: ['oral', 'intravenosa', 'intramuscular', 'subcutânea', 'tópica', 'inalatória', 'retal', 'vaginal', 'ouvido', 'outro']},
    valor: { type: Number },
    unidade_duracao: {type: String,enum: ['horas', 'dias', 'semanas', 'meses', 'anos']}
}, { timestamps: true });
module.exports = mongoose.model('ConsultaMedicamentos', ConsultaMedicamento);