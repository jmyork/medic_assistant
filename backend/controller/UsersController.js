const Users = require('../model/Users');
const Medicos = require('../model/Medicos');
const Consultas = require('../model/Consultas');
const bcrypt = require('bcryptjs');

// Regras:
// - email único
// - tipo deve ser um dos enum

async function create(req, res, next) {
    try {
        const { email, nome, password, tipo } = req.body;
        if (!['admin', 'medico', 'paciente'].includes(tipo)) {
            return res.status(400).json({ data: null, message: 'tipo inválido. Deve ser um dos seguintes: admin, medico, paciente' });
        }
        if (!email || !nome || !password) return res.status(400).json({ data: null, message: 'email, nome, password e tipo são obrigatórios' });

        const existing = await Users.findOne({ email });
        if (existing) return res.status(409).json({ data: null, message: 'email já em uso' });

        const hashed = await bcrypt.hash(password, 10);

        const user = new Users({ ...req.body, password: hashed });
        await user.save();
        return res.status(201).json({ data: user, message: 'Usuário criado com sucesso' });
    } catch (err) { next(err); }
}

async function list(req, res, next) { try { const all = await Users.find().lean(); return res.status(200).json({ data: all, message: 'Lista de usuários obtida com sucesso' }); } catch (err) { next(err); } }

async function get(req, res, next) { try { const item = await Users.findById(req.params.id).lean(); if (!item) return res.status(404).json({ data: null, message: 'User não encontrado' }); return res.status(200).json({ data: item, message: 'Usuário obtido com sucesso' }); } catch (err) { next(err); } }

async function update(req, res, next) {
    try {
        const { email } = req.body;
        if (email) {
            const other = await Users.findOne({ email, _id: { $ne: req.params.id } });
            if (other) return res.status(409).json({ data: null, message: 'email já em uso' });
        }
        // se atualizar password, hashear
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const updated = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ data: null, message: 'User não encontrado' });
        return res.status(200).json({ data: updated, message: 'Usuário atualizado com sucesso' });
    } catch (err) { next(err); }
}

async function remove(req, res, next) {
    try {
        const { id } = req.params;
        // Se existir médico associado ao user, não apagar automaticamente
        const medico = await Medicos.findOne({ user: id });
        if (medico) return res.status(400).json({ data: null, message: 'Existe um registo de médico associado; remova-o antes' });

        const removed = await Users.findByIdAndDelete(id);
        if (!removed) return res.status(404).json({ data: null, message: 'User não encontrado' });
        return res.status(204).send();
    } catch (err) { next(err); }
}
async function getUserCount(req, res, next) {
    try {
        const { id } = req.params;
        // Se existir médico associado ao user, não apagar automaticamente
        const userCounts = await Users.countDocuments();
        return res.status(200).json({ data: userCounts, message: 'Existe um registo de médico associado; remova-o antes' });

        return res.status(204).send();
    } catch (err) { next(err); }
}
async function getQtdConsultas(req, res) {
    try {
        const qtdConsultas = await Consultas.countDocuments();
        return res.status(200).json({ data: qtdConsultas, message: 'Quantidade de consultas obtida com sucesso' });
    } catch (err) {
        return res.status(500).json({ data: null, message: 'Erro ao obter a quantidade de consultas' });
    }
}

async function getQtdConsultasMes(req, res) {
    try {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        const qtdConsultasMes = await Consultas.countDocuments({
            createdAt: {
                $gte: firstDayOfMonth,
                $lte: lastDayOfMonth
            }
        });
        return res.status(200).json({ data: qtdConsultasMes, message: 'Quantidade de consultas do mês obtida com sucesso' });
    } catch (err) {
        return res.status(500).json({ data: null, message: 'Erro ao obter a quantidade de consultas do mês' });
    }
}


module.exports = { create, list, get, update, remove, getUserCount, getQtdConsultas, getQtdConsultasMes };
