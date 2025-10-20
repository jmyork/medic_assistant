const Consultas = require('../model/Consultas');
const Pacientes = require('../model/Pacientes');
const Medicos = require('../model/Medicos');
const Recomendacoes = require('../model/Recomendacoes');

// Regras principais:
// - paciente e medico são obrigatórios e devem existir
// - data_hora é obrigatória; uma vez criada, é imutável (model já define immutable)
// - quando resultado for referência para Doencas, o serviço deve permitir ObjectId ou texto

exports.create = async (req, res, next) => {
    try {
        const { paciente, medico, data_hora } = req.body;
        if (!paciente) return res.status(400).json({ message: 'paciente é obrigatório' });
        if (!medico) return res.status(400).json({ message: 'medico é obrigatório' });
        if (!data_hora) return res.status(400).json({ message: 'data_hora é obrigatória' });

        const p = await Pacientes.findById(paciente);
        if (!p) return res.status(400).json({ message: 'paciente não encontrado' });
        const m = await Medicos.findById(medico);
        if (!m) return res.status(400).json({ message: 'medico não encontrado' });

        // Validação das recomendacoes se fornecidas
        if (req.body.recomendacoes_medicos && req.body.recomendacoes_medicos.length) {
            const recCount = await Recomendacoes.countDocuments({ _id: { $in: req.body.recomendacoes_medicos } });
            if (recCount !== req.body.recomendacoes_medicos.length) return res.status(400).json({ message: 'algumas recomendacoes_medicos não existem' });
        }

        const consulta = new Consultas(req.body);
        await consulta.save();
        res.status(201).json(consulta);
    } catch (err) {
        next(err);
    }
};

exports.list = async (req, res, next) => {
    try {
        const list = await Consultas.find().populate('paciente medico recomendacoes_medicos').lean();
        res.json(list);
    } catch (err) {
        next(err);
    }
};

exports.get = async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await Consultas.findById(id).populate('paciente medico recomendacoes_medicos').lean();
        if (!item) return res.status(404).json({ message: 'Consulta não encontrada' });
        res.json(item);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        // não permitir alteração da data_hora (model define immutable, mas bloqueamos por segurança)
        if (req.body.data_hora) return res.status(400).json({ message: 'data_hora é imutável' });

        const updates = req.body;
        if (updates.paciente) {
            const p = await Pacientes.findById(updates.paciente);
            if (!p) return res.status(400).json({ message: 'paciente não encontrado' });
        }
        if (updates.medico) {
            const m = await Medicos.findById(updates.medico);
            if (!m) return res.status(400).json({ message: 'medico não encontrado' });
        }

        const consulta = await Consultas.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!consulta) return res.status(404).json({ message: 'Consulta não encontrada' });
        res.json(consulta);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const removed = await Consultas.findByIdAndDelete(id);
        if (!removed) return res.status(404).json({ message: 'Consulta não encontrada' });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
