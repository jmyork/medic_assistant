const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tipo: { type: String, enum: ['paciente', 'medico', 'admin'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
