const Doencas = require('../model/Doencas');

async function create(req, res, next) {
    try {
        if (!req.body.nome) return res.status(400).json({ message: 'nome é obrigatório' });
        const d = new Doencas(req.body);
        await d.save();
        return res.status(201).json({ data: d, message: 'Doença Registra com sucesso' });
    } catch (err) {
        next(err);
    }
}

async function list(req, res, next) {
    try {
        const all = await Doencas.find().lean();
        return res.status(200).json({ data: all, message: 'Lista de doenças obtida com sucesso' });
    } catch (err) { next(err); }
}

async function get(req, res, next) {
    try {
        const doc = await Doencas.findById(req.params.id).lean();
        if (!doc) return res.status(404).json({ data: null, message: 'Doença não encontrada' });
        return res.status(200).json({ data: doc, message: 'Doença obtida com sucesso' });
    } catch (err) { next(err); }
}

async function update(req, res, next) {
    try {
        const updated = await Doencas.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ data: null, message: 'Doença não encontrada' });
        return res.status(200).json({ data: updated, message: 'Doença atualizada com sucesso' });
    } catch (err) { next(err); }
}

async function remove(req, res, next) {
    try {
        const removed = await Doencas.findByIdAndDelete(req.params.id);
        if (!removed) return res.status(404).json({ data: null, message: 'Doença não encontrada' });
        return res.status(204).send();
    } catch (err) { next(err); }
}

module.exports = { create, list, get, update, remove };
