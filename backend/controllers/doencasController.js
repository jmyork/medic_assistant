const Doencas = require('../model/Doencas');

exports.create = async (req, res, next) => {
    try {
        if (!req.body.nome) return res.status(400).json({ message: 'nome é obrigatório' });
        const d = new Doencas(req.body);
        await d.save();
        res.status(201).json(d);
    } catch (err) {
        next(err);
    }
};

exports.list = async (req, res, next) => {
    try {
        const all = await Doencas.find().lean();
        res.json(all);
    } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
    try {
        const doc = await Doencas.findById(req.params.id).lean();
        if (!doc) return res.status(404).json({ message: 'Doença não encontrada' });
        res.json(doc);
    } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
    try {
        const updated = await Doencas.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ message: 'Doença não encontrada' });
        res.json(updated);
    } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
    try {
        const removed = await Doencas.findByIdAndDelete(req.params.id);
        if (!removed) return res.status(404).json({ message: 'Doença não encontrada' });
        res.status(204).send();
    } catch (err) { next(err); }
};
