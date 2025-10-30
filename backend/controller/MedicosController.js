const Medicos = require('../model/Medicos');
const Users = require('../model/Users');

// Regras:
// - ao criar um médico, user deve existir e ser do tipo 'medico'
// - especialidade é obrigatória

async function create(req, res, next) {
    try {
        const { user, especialidade } = req.body;
        if (!user) return res.status(400).json({ message: 'user é obrigatório' });
        if (!especialidade) return res.status(400).json({ message: 'especialidade é obrigatória' });

        const userDoc = await Users.findById(user);
        console.log(userDoc)
        if (!userDoc) return res.status(400).json({ message: 'user não encontrado' });
        if (userDoc.tipo !== 'medico') return res.status(400).json({ message: "user não é do tipo 'medico'" });

        const medico = new Medicos(req.body);
        await medico.save();
        return res.status(201).json({ data: medico, message: 'Médico criado com sucesso' });
    } catch (err) {
        next(err);
    }
}

async function list(req, res, next) {
    try {
        const medicos = await Medicos.find().populate('user', 'nome email').lean();
        return res.status(200).json({ data: medicos, message: 'Lista de médicos obtida com sucesso' });
    } catch (err) {
        next(err);
    }
}

async function get(req, res, next) {
    try {
        const { id } = req.params;
        const medico = await Medicos.findById(id).populate('user', 'nome email').lean();
        if (!medico) return res.status(404).json({ data: null, message: 'Médico não encontrado' });
        return res.status(200).json({ data: medico, message: 'Médico obtido com sucesso' });
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (updates.user) {
            const userDoc = await Users.findById(updates.user);
            if (!userDoc) return res.status(400).json({ message: 'user não encontrado' });
            if (userDoc.tipo !== 'medico') return res.status(400).json({ message: "user não é do tipo 'medico'" });
        }
        const medico = await Medicos.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!medico) return res.status(404).json({ data: null, message: 'Médico não encontrado' });
        return res.status(200).json({ data: medico, message: 'Médico atualizado com sucesso' });
    } catch (err) {
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        const { id } = req.params;
        // Não removemos user aqui, apenas o registro de médico
        const removed = await Medicos.findByIdAndDelete(id);
        if (!removed) return res.status(404).json({ data: null, message: 'Médico não encontrado' });
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
}

module.exports = { create, list, get, update, remove };
