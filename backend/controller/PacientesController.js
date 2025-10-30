const Pacientes = require('../model/Pacientes');
const Consultas = require('../model/Consultas');

// Regras principais:
// - nome é obrigatório
// - se documento for fornecido deve ser único
// - antes de apagar, impedir remoção se houver consultas relacionadas

async function create(req, res, next) {
    try {
        const { nome, documento } = req.body;
        if (!nome) return res.status(400).json({ message: 'nome é obrigatório' });

        if (documento) {
            const existing = await Pacientes.findOne({ documento });
            if (existing) return res.status(409).json({ message: 'documento já existe' });
        }

        const paciente = new Pacientes(req.body);
        await paciente.save();
        res.status(201).json({ data: paciente, message: "Paciente criado com sucesso" });
    } catch (err) {
        next(err);
    }
}

async function list(req, res, next) {
    try {
        const pacientes = await Pacientes.find().lean();
        res.status(200).json({ data: pacientes, message: "Lista de pacientes obtida com sucesso" });
    } catch (err) {
        next(err);
    }
}

async function get(req, res, next) {
    try {
        const { id } = req.params;
        const paciente = await Pacientes.findOne({ número_seguranca_social: req.numero_seguranca_social, $or: { documento: req.params.documento, documento_identificacao_tipo: req.params.documento_identificacao_tipo } }).lean();
        if (!paciente) return res.status(404).json({ data: null, message: 'Paciente não encontrado' });
        return res.status(200).json({ data: paciente, message: "Paciente encontrado com sucesso" });
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (updates.documento) {
            const other = await Pacientes.findOne({ documento: updates.documento, _id: { $ne: id } });
            if (other) return res.status(409).json({ message: 'documento já existe (outro paciente)' });
        }

        const paciente = await Pacientes.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!paciente) return res.status(404).json({ data: null, message: 'Paciente não encontrado' });
        return res.status(200).json({ data: paciente, message: "Paciente atualizado com sucesso" });
    } catch (err) {
        next(err);
    }
}

// exports.remove = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         // Impedir remoção se houver consultas relacionadas
//         const consulta = await Consultas.findOne({ paciente: id });
//         if (consulta) return res.status(400).json({ message: 'Paciente tem consultas; remova ou reatribua antes de excluir' });

//         const removed = await Pacientes.findByIdAndDelete(id);
//         if (!removed) return res.status(404).json({ message: 'Paciente não encontrado' });
//         res.status(204).send();
//     } catch (err) {
//         next(err);
//     }
// };
async function remove(req, res, next) {
    try {
        const { id } = req.params;
        // Impedir remoção se houver consultas relacionadas
        const consulta = await Consultas.findOne({ paciente: id });
        if (consulta) return res.status(400).json({ data: null, message: 'Paciente tem consultas; remova ou reatribua antes de excluir' });

        const removed = await Pacientes.findByIdAndDelete(id);
        if (!removed) return res.status(404).json({ data: null, message: 'Paciente não encontrado' });
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
}

module.exports = { create, list, get, update, remove };
