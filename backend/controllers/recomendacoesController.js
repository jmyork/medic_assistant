const Recomendacoes = require('../model/Recomendacoes');

exports.create = async (req, res, next) => {
    try {
        if (!req.body.nome) return res.status(400).json({ message: 'nome é obrigatório' });
        const r = new Recomendacoes(req.body);
        await r.save();
        res.status(201).json(r);
    } catch (err) { next(err); }
};

exports.list = async (req, res, next) => {
    try { const all = await Recomendacoes.find().lean(); res.json(all); } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
    try { const item = await Recomendacoes.findById(req.params.id).lean(); if (!item) return res.status(404).json({ message: 'Recomendação não encontrada' }); res.json(item); } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
    try { const updated = await Recomendacoes.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); if (!updated) return res.status(404).json({ message: 'Recomendação não encontrada' }); res.json(updated); } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
    try { const removed = await Recomendacoes.findByIdAndDelete(req.params.id); if (!removed) return res.status(404).json({ message: 'Recomendação não encontrada' }); res.status(204).send(); } catch (err) { next(err); }
};
