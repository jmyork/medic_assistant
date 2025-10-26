const Consultas = require('../model/Consultas');
const Pacientes = require('../model/Pacientes');
const Medicos = require('../model/Medicos');
const Recomendacoes = require('../model/Recomendacoes');

// Regras principais:
// - paciente e medico são obrigatórios e devem existir
// - data_hora é obrigatória; uma vez criada, é imutável (model já define immutable)
// - quando resultado for referência para Doencas, o serviço deve permitir ObjectId ou texto

async function create(req, res, next) {
    try {
        const { paciente, medico, data_hora } = req.body;
        if (!paciente) return res.status(400).json({ data: null, message: 'paciente é obrigatório' });
        if (!medico) return res.status(400).json({ data: null, message: 'medico é obrigatório' });
        if (!data_hora) return res.status(400).json({ data: null, message: 'data_hora é obrigatória' });

        const p = await Pacientes.findById(paciente);
        if (!p) return res.status(400).json({ data: null, message: 'paciente não encontrado' });
        const m = await Medicos.findById(medico);
        if (!m) return res.status(400).json({ data: null, message: 'medico não encontrado' });

        // Validação das recomendacoes se fornecidas
        if (req.body.recomendacoes_medicos && req.body.recomendacoes_medicos.length) {
            const recCount = await Recomendacoes.countDocuments({ _id: { $in: req.body.recomendacoes_medicos } });
            if (recCount !== req.body.recomendacoes_medicos.length)
                return res.status(400).json({ data: null, message: 'algumas recomendacoes_medicos não existem' });
        }

        const consulta = new Consultas(req.body);
        await consulta.save();
        return res.status(201).json({ data: consulta, message: 'Consulta criada com sucesso' });
    } catch (err) {
        next(err);
    }
}

async function list(req, res, next) {
    try {
        const list = await Consultas.find().populate('paciente medico recomendacoes_medicos').lean();
        return res.status(200).json({ data: list, message: 'Lista de consultas obtida com sucesso' });
    } catch (err) {
        next(err);
    }
}

async function get(req, res, next) {
    try {
        const { id } = req.params;
        const item = await Consultas.findById(id).populate('paciente medico recomendacoes_medicos').lean();
        if (!item) return res.status(404).json({ data: null, message: 'Consulta não encontrada' });
        return res.status(200).json({ data: item, message: 'Consulta obtida com sucesso' });
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const { id } = req.params;
        // não permitir alteração da data_hora (model define immutable, mas bloqueamos por segurança)
        if (req.body.data_hora) return res.status(400).json({ data: null, message: 'data_hora é imutável' });

        const updates = req.body;
        if (updates.paciente) {
            const p = await Pacientes.findById(updates.paciente);
            if (!p) return res.status(400).json({ data: null, message: 'paciente não encontrado' });
        }
        if (updates.medico) {
            const m = await Medicos.findById(updates.medico);
            if (!m) return res.status(400).json({ data: null, message: 'medico não encontrado' });
        }

        const consulta = await Consultas.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!consulta) return res.status(404).json({ data: null, message: 'Consulta não encontrada' });
        return res.status(200).json({ data: consulta, message: 'Consulta atualizada com sucesso' });
    } catch (err) {
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        const { id } = req.params;
        const removed = await Consultas.findByIdAndDelete(id);
        if (!removed) return res.status(404).json({ data: null, message: 'Consulta não encontrada' });
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
}

module.exports = { create, list, get, update, remove };
