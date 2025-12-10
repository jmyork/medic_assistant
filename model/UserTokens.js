const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  expiracao: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Auth', AuthSchema);
