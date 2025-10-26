const Medicamentos = require('../model/Medicamentos');

// Regras:
// - nome e dosagem obrigatórios

async function create(req, res, next) {
    try {
        const { nome, dosagem } = req.body;
        if (!nome) return res.status(400).json({ message: 'nome é obrigatório' });
        if (!dosagem) return res.status(400).json({ message: 'dosagem é obrigatória' });

        const med = new Medicamentos(req.body);
        await med.save();
        return res.status(201).json({ data: med, message: 'Medicamento criado com sucesso' });
    } catch (err) {
        next(err);
    }
}

async function list(req, res, next) {
    try {
        const all = await Medicamentos.find().lean();
        return res.status(200).json({ data: all, message: 'Lista de medicamentos obtida com sucesso' });
    } catch (err) {
        next(err);
    }
}

async function get(req, res, next) {
    try {
        const med = await Medicamentos.findById(req.params.id).lean();
        if (!med) return res.status(404).json({ data: null, message: 'Medicamento não encontrado' });
        return res.status(200).json({ data: med, message: 'Medicamento obtido com sucesso' });
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const updated = await Medicamentos.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ data: null, message: 'Medicamento não encontrado' });
        return res.status(200).json({ data: updated, message: 'Medicamento atualizado com sucesso' });
    } catch (err) {
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        const removed = await Medicamentos.findByIdAndDelete(req.params.id);
        if (!removed) return res.status(404).json({ data: null, message: 'Medicamento não encontrado' });
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
}

module.exports = { create, list, get, update, remove };
