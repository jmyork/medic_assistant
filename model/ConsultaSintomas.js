const mongoose = require("mongoose");

const ConsultaSintomaSchema = new mongoose.Schema({
    consulta: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultas', required: true },
    sintoma: { type: mongoose.Schema.Types.ObjectId, ref: 'Sintoma', required: true },
}, { timestamps: true });
module.exports = mongoose.model('ConsultasSintomas', ConsultaSintomaSchema);