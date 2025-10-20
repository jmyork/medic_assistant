const Users = require('../model/Users');
const Medicos = require('../model/Medicos');
const bcrypt = require('bcryptjs');

// Regras:
// - email único
// - tipo deve ser um dos enum

exports.create = async (req, res, next) => {
    try {
        const { email, nome, password, tipo } = req.body;
        if (!email || !nome || !password || !tipo) return res.status(400).json({ message: 'email, nome, password e tipo são obrigatórios' });

        const existing = await Users.findOne({ email });
        if (existing) return res.status(409).json({ message: 'email já em uso' });

        const hashed = await bcrypt.hash(password, 10);
        const user = new Users({ ...req.body, password: hashed });
        await user.save();
        res.status(201).json(user);
    } catch (err) { next(err); }
};

exports.list = async (req, res, next) => { try { const all = await Users.find().lean(); res.json(all); } catch (err) { next(err); } };

exports.get = async (req, res, next) => { try { const item = await Users.findById(req.params.id).lean(); if (!item) return res.status(404).json({ message: 'User não encontrado' }); res.json(item); } catch (err) { next(err); } };

exports.update = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (email) {
            const other = await Users.findOne({ email, _id: { $ne: req.params.id } });
            if (other) return res.status(409).json({ message: 'email já em uso' });
        }
        // se atualizar password, hashear
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const updated = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ message: 'User não encontrado' });
        res.json(updated);
    } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Se existir médico associado ao user, não apagar automaticamente
        const medico = await Medicos.findOne({ user: id });
        if (medico) return res.status(400).json({ message: 'Existe um registo de médico associado; remova-o antes' });

        const removed = await Users.findByIdAndDelete(id);
        if (!removed) return res.status(404).json({ message: 'User não encontrado' });
        res.status(204).send();
    } catch (err) { next(err); }
};
