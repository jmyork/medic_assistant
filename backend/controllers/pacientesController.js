const Pacientes = require('../model/Pacientes');
const Consultas = require('../model/Consultas');

// Regras principais:
// - nome é obrigatório
// - se documento for fornecido deve ser único
// - antes de apagar, impedir remoção se houver consultas relacionadas

exports.create = async (req, res, next) => {
    try {
        const { nome, documento } = req.body;
        if (!nome) return res.status(400).json({ message: 'nome é obrigatório' });

        if (documento) {
            const existing = await Pacientes.findOne({ documento });
            if (existing) return res.status(409).json({ message: 'documento já existe' });
        }

        const paciente = new Pacientes(req.body);
        await paciente.save();
        res.status(201).json(paciente);
    } catch (err) {
        next(err);
    }
};

exports.list = async (req, res, next) => {
    try {
        const pacientes = await Pacientes.find().lean();
        res.json(pacientes);
    } catch (err) {
        next(err);
    }
};

exports.get = async (req, res, next) => {
    try {
        const { id } = req.params;
        const paciente = await Pacientes.findById(id).lean();
        if (!paciente) return res.status(404).json({ message: 'Paciente não encontrado' });
        res.json(paciente);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (updates.documento) {
            const other = await Pacientes.findOne({ documento: updates.documento, _id: { $ne: id } });
            if (other) return res.status(409).json({ message: 'documento já existe (outro paciente)' });
        }

        const paciente = await Pacientes.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!paciente) return res.status(404).json({ message: 'Paciente não encontrado' });
        res.json(paciente);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Impedir remoção se houver consultas relacionadas
        const consulta = await Consultas.findOne({ paciente: id });
        if (consulta) return res.status(400).json({ message: 'Paciente tem consultas; remova ou reatribua antes de excluir' });

        const removed = await Pacientes.findByIdAndDelete(id);
        if (!removed) return res.status(404).json({ message: 'Paciente não encontrado' });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
