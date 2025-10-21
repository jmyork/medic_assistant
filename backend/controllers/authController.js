const Users = require('../model/Users');
const UserTokens = require('../model/UserTokens');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const SECRET = process.env.JWT_SECRET || 'dev_secret_key';

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ data: null, message: 'email e password são obrigatórios' });

        const user = await Users.findOne({ email });
        if (!user) return res.status(401).json({ data: null, message: 'Credenciais inválidas' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ data: null, message: 'Credenciais inválidas' });

        const payload = { id: user._id, tipo: user.tipo };
        const token = jwt.sign(payload, SECRET, { expiresIn: '8h' });
        return res.status(200).json({ data: { token }, message: 'Autenticado com sucesso' });
    } catch (err) { next(err); }
}

async function logout(req, res, next) {
    // O cliente deve descartar o token; aqui retornamos 204
    delete req.user; // se estivermos usando algum middleware de autenticação
    return res.status(204).send();
}

// Request password reset: gera token, salva em UserTokens e retorna token (em produção enviar por email)
async function requestPasswordReset(req, res, next) {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ data: null, message: 'email é obrigatório' });

        const user = await Users.findOne({ email });
        if (!user) return res.status(200).json({ data: null, message: 'Se o email existir, instruções serão enviadas' });

        const token = crypto.randomBytes(32).toString('hex');
        const expiracao = new Date(Date.now() + 1000 * 60 * 60); // 1h

        const ut = new UserTokens({ user: user._id, token, expiracao });
        await ut.save();

        // Em produção: enviar email com link de reset contendo o token
        return res.status(200).json({ data: { token }, message: 'Token de reset gerado' });
    } catch (err) { next(err); }
}

// Reset password: recebe token e nova senha
async function resetPassword(req, res, next) {
    try {
        const { token, password } = req.body;
        if (!token || !password) return res.status(400).json({ data: null, message: 'token e password são obrigatórios' });

        const record = await UserTokens.findOne({ token });
        if (!record) return res.status(400).json({ data: null, message: 'token inválido' });
        if (record.expiracao < new Date()) return res.status(400).json({ data: null, message: 'token expirado' });

        const user = await Users.findById(record.user);
        if (!user) return res.status(400).json({ data: null, message: 'user associado ao token não existe' });

        user.password = await bcrypt.hash(password, 10);
        await user.save();

        // invalidar token
        await UserTokens.deleteMany({ user: user._id });

        return res.status(200).json({ data: null, message: 'Senha redefinida com sucesso' });
    } catch (err) { next(err); }
}

module.exports = { login, logout, requestPasswordReset, resetPassword };
