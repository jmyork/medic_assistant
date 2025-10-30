const mongoose = require("mongoose");

const ConsultaSchema = new mongoose.Schema({
    paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
    medico: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicos', required: true },
    data_hora: { type: Date, required: true, default: Date.now, immutable: true },
    // o resultado pode ser uma doenla diagnosticada (referencia a Doencas) ou um texto livre indicado pelo medico
    resultado: { type: mongoose.Schema.Types.Mixed },
    recomendacoes_medicos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recomendacao' }],
    recomendacoes_livres: [{ type: String }]
}, { timestamps: true });
module.exports = mongoose.model('Consultas', ConsultaSchema);