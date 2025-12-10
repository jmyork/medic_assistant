const Pacientes = require('../model/Pacientes');
const Users = require('../model/Users');
const Consultas = require('../model/Consultas');
const ConsultaSintomas = require('../model/ConsultaSintomas');
const Sintomas = require('../model/Sintomas');

// Regras principais:
// - nome é obrigatório
// - se documento for fornecido deve ser único
// - antes de apagar, impedir remoção se houver consultas relacionadas

async function create(req, res, next) {
    try {
        const { nome, documento } = req.body;
        if (!nome) return res.status(400).json({ message: 'nome é obrigatório' });

        console.log("req.user:", req.user.id);
        // Normalize field name: accept both 'numero_seguranca_social' and 'número_seguranca_social'
        if (req.body.numero_seguranca_social && !req.body['número_seguranca_social']) {
            req.body['número_seguranca_social'] = req.body.numero_seguranca_social;
        }

        // Determine which user this paciente will be associated with
        let userId = req.user.id;
        // If admin and provided a user id in body, allow creating paciente for that user (admin action)
        if (req.user.tipo === 'admin' && req.body.user) {
            // validate the supplied user exists and is of tipo 'paciente'
            const targetUser = await Users.findById(req.body.user);
            if (!targetUser) return res.status(400).json({ message: 'user inválido fornecido' });
            if (targetUser.tipo !== 'paciente') return res.status(400).json({ message: 'o user fornecido não é do tipo paciente' });
            userId = req.body.user;
        }

        if (documento) {
            const existing = await Pacientes.findOne({ documento });
            if (existing) return res.status(409).json({ message: 'documento já existe' });
        }
        // verificar se já existe paciente associado ao user
        if (await Pacientes.findOne({ user: userId })) {
            return res.status(409).json({ message: 'Paciente já associado a este utilizador' });
        }

        const paciente = new Pacientes({ ...req.body, user: userId });
        await paciente.save();
        res.status(201).json({ data: paciente, message: "Paciente criado com sucesso" });
    } catch (err) {
        next(err);
    }
}

async function getPatientData(req, res, next) {
    try {
        let paciente;
        // Buscar paciente do utilizador autenticado
        if (req.params.patientId)
            paciente = await Pacientes.findOne(req.params.patient).populate('user', 'email nome').lean();
        else
            paciente = await Pacientes.findOne({
                $or: {
                    documento: req.user.documento,
                    documento_identificacao_tipo: req.user.documento_identificacao_tipo
                }
            }).populate('user', 'email nome').lean();

        if (!paciente) {
            return res.status(404).json({ data: null, message: 'Paciente não encontrado' });
        }

        // Formatar dados do paciente conforme esperado pelo frontend
        const patientData = {
            name: paciente.nome,
            bi: paciente.documento_identificacao_tipo ? `${paciente.documento}${paciente.documento_identificacao_tipo}` : paciente.documento,
            email: paciente.user?.email || '',
            weight: paciente.peso ? `${paciente.peso} kg` : '',
            height: paciente.altura ? `${paciente.altura} m` : '',
            chronicDiseases: paciente.predisposicoes || [],
            pacienteId: paciente._id,
            dataNascimento: paciente.data_nascimento,
            genero: paciente.genero,
            contacto: paciente.contacto,
            endereco: paciente.endereco
        };

        return res.status(200).json({ data: patientData, message: "Dados do paciente obtidos com sucesso" });
    } catch (err) {
        next(err);
    }
}

async function getPatientHistory(req, res, next) {
    try {
        // Buscar paciente do utilizador autenticado
        const paciente = await Pacientes.findOne({ user: req.params.patientId });

        if (!paciente) {
            return res.status(404).json({ data: null, message: 'Paciente não encontrado' });
        }

        // Buscar consultas do paciente
        const consultas = await Consultas.find({ paciente: paciente._id }).sort({ data_hora: -1 }).lean();

        // Para cada consulta, buscar os sintomas associados
        const symptomsHistory = [];

        for (const consulta of consultas) {
            const consultaSintomas = await ConsultaSintomas.find({ consulta: consulta._id }).populate('sintoma', 'nome descricao').lean();

            // Concatenar os nomes dos sintomas
            const symptomsNames = consultaSintomas.map(cs => cs.sintoma.nome)

            symptomsHistory.push({
                id: consulta._id,
                date: consulta.data_hora.toISOString().split('T')[0], // Formato YYYY-MM-DD
                symptoms: symptomsNames || 'Sem sintomas registados',
                intensity: consulta.resultado?.intensity || 'Não especificada', // Se houver intensity no resultado
                status: consulta.status
            });
        }

        return res.status(200).json({
            data: symptomsHistory,
            message: "Histórico de sintomas obtido com sucesso"
        });
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

module.exports = { create, getPatientData, getPatientHistory, list, get, update, remove };
