const  mongoose = require('mongoose');

const SintomaMedicamentosSchema = new mongoose.Schema({
    sintoma: { type: mongoose.Schema.Types.ObjectId, ref: 'Sintoma', required: true },
    recomendacao: { type: mongoose.Schema.Types.ObjectId, ref: 'Recomendacoes', required: true },
    // indicacao: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('SintomaRecomendacoes', SintomaMedicamentosSchema);