const Consulta = require('../model/Consultas');
const Sintoma = require('../model/Sintomas');
const ConsultasSintomas = require('../model/ConsultaSintomas');

// Regras principais:
// - paciente e medico são obrigatórios e devem existir
// - data_hora é obrigatória; uma vez criada, é imutável (model já define immutable)
// - quando resultado for referência para Doencas, o serviço deve permitir ObjectId ou texto

async function create(req, res, next) {
    try {
        const { sintomas, consulta } = req.body;
        if (!sintomas || Array.isArray < String > (sintomas)) return res.status(400).json({ data: null, message: 'Um array de sintomas deve ser especificado. exemplo: sintomas:["a","b","c"]' });
        if (!consulta) return res.status(400).json({ data: null, message: 'Número de consulta deve ser especificado.' });

        const sintomasExistentes = await Sintoma.find({ _id: { $in: sintomas } }).select('_id').lean();
        if (sintomasExistentes.length !== sintomas.length) {
            return res.status(400).json({ data: null, message: 'Alguns sintomas fornecidos não existem.' });
        }

        // checar se  a doença existe
        const consultaExistente = await Consulta.findById(consulta).select('_id').lean();
        if (!consultaExistente) {
            return res.status(400).json({ data: null, message: 'Consulta fornecida não existe.' });
        }
        const saved=sintomasExistentes.map(sintoma=>{
            (new ConsultasSintomas({consulta:consulta,sintoma})).save()

        })

        // criar a associação
        // const novaConsultaSintomas = new ConsultasSintomas({ sintomas, consulta });
        // const saved = await novaConsultaSintomas.save();
        return res.status(201).json({ data: saved, message: 'Associação consulta-sintomas criada com sucesso' });
    } catch (err) {
        next(err);
    }
}

async function list(req, res, next) {
    try {
        const list = await ConsultasSintomas.find({ consulta: req.params.id }).populate("sintoma").lean();
        return res.status(200).json({ data: list, message: 'Lista de consultas obtida com sucesso' });
    } catch (err) {
        next(err);
    }
}

// async function get(req, res, next) {
//     try {
//         const { id } = req.params;
//         const item = await ConsultasSintomas.findById(id).populate('paciente medico recomendacoes_medicos').lean();
//         if (!item) return res.status(404).json({ data: null, message: 'Consulta não encontrada' });
//         return res.status(200).json({ data: item, message: 'Consulta obtida com sucesso' });
//     } catch (err) {
//         next(err);
//     }
// }

async function remove(req, res, next) {
    try {
        const { id } = req.params;
        const removed = await ConsultasSintomas.findByIdAndDelete(id);
        if (!removed) return res.status(404).json({ data: null, message: 'Consulta não encontrada' });
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
}

module.exports = { create, list, remove };
