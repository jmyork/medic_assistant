const Exames = require('../model/Exames');

// Regras importantes extraídas do model:
// - nome é obrigatório
// - minimo_normal < maximo_normal (validação já no model)

exports.create = async (req, res, next) => {
    try {
        if (!req.body.nome) return res.status(400).json({ message: 'nome é obrigatório' });
        const exame = new Exames(req.body);
        await exame.save();
        res.status(201).json(exame);
    } catch (err) {
        next(err);
    }
};

exports.list = async (req, res, next) => {
    try {
        const all = await Exames.find().lean();
        res.json(all);
    } catch (err) {
        next(err);
    }
};

exports.get = async (req, res, next) => {
    try {
        const exame = await Exames.findById(req.params.id).lean();
        if (!exame) return res.status(404).json({ message: 'Exame não encontrado' });
        res.json(exame);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const updated = await Exames.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ message: 'Exame não encontrado' });
        res.json(updated);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const removed = await Exames.findByIdAndDelete(req.params.id);
        if (!removed) return res.status(404).json({ message: 'Exame não encontrado' });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
