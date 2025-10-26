const Recomendacoes = require('../model/Recomendacoes');

async function create(req, res, next) {
    try {
        if (!req.body.nome) return res.status(400).json({ message: 'nome é obrigatório' });
        const r = new Recomendacoes(req.body);
        await r.save();
        return res.status(201).json({ data: r, message: 'Recomendação criada com sucesso' });
    } catch (err) { next(err); }
}

async function list(req, res, next) {
    try {
        const all = await Recomendacoes.find().lean();
        return res.status(200).json({ data: all, message: 'Lista de recomendações obtida com sucesso' });
    } catch (err) { next(err); }
}

async function get(req, res, next) {
    try {
        const item = await Recomendacoes.findById(req.params.id).lean();
        if (!item) return res.status(404).json({ data: null, message: 'Recomendação não encontrada' });
        return res.status(200).json({ data: item, message: 'Recomendação obtida com sucesso' });
    } catch (err) { next(err); }
}

async function update(req, res, next) {
    try {
        const updated = await Recomendacoes.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ data: null, message: 'Recomendação não encontrada' });
        return res.status(200).json({ data: updated, message: 'Recomendação atualizada com sucesso' });
    } catch (err) { next(err); }
}

async function remove(req, res, next) {
    try { const removed = await Recomendacoes.findByIdAndDelete(req.params.id); if (!removed) return res.status(404).json({ data: null, message: 'Recomendação não encontrada' }); return res.status(204).send(); } catch (err) { next(err); }
}

module.exports = { create, list, get, update, remove };
