const Sintomas = require('../model/Sintomas');

async function create(req, res, next) {
    try {
        if (!req.body.nome) return res.status(400).json({ message: 'nome é obrigatório' });
        const s = new Sintomas(req.body);
        await s.save();
        return res.status(201).json({ data: s, message: "Sintoma criado com sucesso" });
    } catch (err) {
        next(err);
    }
}

async function list(req, res, next) {
    try {
        const all = await Sintomas.find().lean();
        return res.status(200).json({ data: all, message: "Lista de sintomas obtida com sucesso" });
    } catch (err) { next(err); }
}

async function get(req, res, next) {
    try {
        const item = await Sintomas.findById(req.params.id).lean();
        if (!item) return res.status(404).json({ data: null, message: 'Sintoma não encontrado' });
        return res.status(200).json({ data: item, message: "Sintoma obtido com sucesso" });
    } catch (err) { next(err); }
}

async function update(req, res, next) {
    try {
        const updated = await Sintomas.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ data: null, message: 'Sintoma não encontrado' });
        return res.status(200).json({ data: updated, message: "Sintoma atualizado com sucesso" });
    } catch (err) { next(err); }
}

async function remove(req, res, next) {
    try {
        const removed = await Sintomas.findByIdAndDelete(req.params.id);
        if (!removed) return res.status(404).json({ data: null, message: 'Sintoma não encontrado' });
        return res.status(204).send();
    } catch (err) { next(err); }
}

module.exports = { create, list, get, update, remove };
