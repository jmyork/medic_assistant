const mongoose = require('mongoose');

// URL de conexão local (ajusta conforme teu ambiente)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/medic_assistant';

// Opções recomendadas
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Função de conexão
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, options);
    console.log('✅ Conectado ao MongoDB com sucesso.');
  } catch (err) {
    console.error('❌ Erro ao conectar ao MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
