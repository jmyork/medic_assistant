const Medicamentos = require('../model/Medicamentos');

// Regras:
// - nome e dosagem obrigatórios

exports.create = async (req, res, next) => {
    try {
        const { nome, dosagem } = req.body;
        if (!nome) return res.status(400).json({ message: 'nome é obrigatório' });
        if (!dosagem) return res.status(400).json({ message: 'dosagem é obrigatória' });

        const med = new Medicamentos(req.body);
        await med.save();
        res.status(201).json(med);
    } catch (err) {
        next(err);
    }
};

exports.list = async (req, res, next) => {
    try {
        const all = await Medicamentos.find().lean();
        res.json(all);
    } catch (err) {
        next(err);
    }
};

exports.get = async (req, res, next) => {
    try {
        const med = await Medicamentos.findById(req.params.id).lean();
        if (!med) return res.status(404).json({ message: 'Medicamento não encontrado' });
        res.json(med);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const updated = await Medicamentos.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ message: 'Medicamento não encontrado' });
        res.json(updated);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const removed = await Medicamentos.findByIdAndDelete(req.params.id);
        if (!removed) return res.status(404).json({ message: 'Medicamento não encontrado' });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
