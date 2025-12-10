const  mongoose = require('mongoose');

const SintomaMedicamentosSchema = new mongoose.Schema({
    sintoma: { type: mongoose.Schema.Types.ObjectId, ref: 'Sintoma', required: true },
    medicamento: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicamentos', required: true },
    // indicacao: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('SintomaMedicamentos', SintomaMedicamentosSchema);