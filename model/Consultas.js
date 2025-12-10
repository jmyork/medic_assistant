const mongoose = require("mongoose");

const ConsultaSchema = new mongoose.Schema({
    paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Pacientes', required: true },
    medico: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicos', required: false },
    data_hora: { type: Date, required: true, default: Date.now, immutable: true },
    // o resultado pode ser uma doenla diagnosticada (referencia a Doencas) ou um texto livre indicado pelo medico
    status: { type: String, enum: ['agendada', 'realizada', 'cancelada', "aprovada", "preliminar"], default: 'preliminar' },

    resultado: { type: mongoose.Schema.Types.Mixed },
    recomendacoes_medicos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recomendacao' }],
    recomendacoes_livres: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Consultas', ConsultaSchema);