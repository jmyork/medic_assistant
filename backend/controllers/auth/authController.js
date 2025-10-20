const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../model/users/user');

const SECRET = process.env.JWT_SECRET || 'dev_secret_key';

// Registro
exports.register = async (req, res) => {
  try {
    const { nome, email, senha, perfil } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Usuário já existe' });

    const hashed = await bcrypt.hash(senha, 10);
    const user = new User({ nome, email, senha: hashed, perfil });

    await user.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    const match = await bcrypt.compare(senha, user.senha);
    if (!match) return res.status(401).json({ message: 'Senha incorreta' });

    const token = jwt.sign({ id: user._id, perfil: user.perfil }, SECRET, { expiresIn: '7d' });

    res.json({ message: 'Autenticação bem-sucedida', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Perfil do usuário autenticado
exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-senha');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
