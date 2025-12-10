const mongoose = require('mongoose');

const ExameSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  variacao_de_nomes: [{ type: String }],
  minimo_normal: { type: Number },
  maximo_normal: { type: Number },
  exames_necessarios_abaixo_minimo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exame' }],
  exames_necessarios_acima_maximo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exame' }],
  recomendacoes_acima_maximo:[{type:mongoose.Schema.Types.ObjectId,ref:'Recomendacao'}],
  recomendacoes_abaixo_minimo:[{type:mongoose.Schema.Types.ObjectId,ref:'Recomendacao'}]
}, { timestamps: true });

// Garantir que minimo_normal seja sempre menor que maximo_normal
ExameSchema.pre('validate', function(next) {
  if (this.minimo_normal != null && this.maximo_normal != null && this.minimo_normal >= this.maximo_normal) {
    this.invalidate('minimo_normal', 'minimo_normal deve ser menor que maximo_normal');
  }
  next();
});

module.exports = mongoose.model('Exames', ExameSchema);
