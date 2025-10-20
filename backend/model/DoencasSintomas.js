const mongoose = require('mongoose');

const DoencasSintomasSchema = new mongoose.Schema({
    doenca: { type: mongoose.Schema.Types.ObjectId, ref: 'Doencas', required: true },
    sintoma: { type: mongoose.Schema.Types.ObjectId, ref: 'Sintoma', required: true },
    grau_importancia_ou_intensidade: { type: Number, required: true, min: 1, max: 10 }
}, { timestamps: true });

module.exports = mongoose.model('DoencasSintomas', DoencasSintomasSchema);