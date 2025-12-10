const mongoose = require('mongoose');

const ConsultaExameSchema = new mongoose.Schema({
    consulta: { type: mongoose.Schema.Types.ObjectId, ref: 'Consulta', required: true },
    exame: { type: mongoose.Schema.Types.ObjectId, ref: 'Exame', required: true },
    resultados: { type: String }
}, { timestamps: true });
module.exports = mongoose.model('ConsultaExames', ConsultaExameSchema);