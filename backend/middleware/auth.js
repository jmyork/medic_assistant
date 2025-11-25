const jwt = require('jsonwebtoken');
const User = require('../model/Users');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

/**
 * Middleware de Autenticação
 * Verifica se o token JWT é válido e extrai as informações do utilizador
 */
async function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                data: null,
                message: 'Token não fornecido'
            });
        }

        // Espera formato "Bearer <token>"
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({
                data: null,
                message: 'Formato de token inválido. Use: Bearer <token>'
            });
        }

        const token = parts[1];

        try {
            const decoded = jwt.verify(token, JWT_SECRET);

            // Buscar utilizador no banco para validar que ainda existe
            const user = await User.findById(decoded.id).select('-password');

            if (!user) {
                return res.status(401).json({
                    data: null,
                    message: 'Utilizador não encontrado'
                });
            }

            // Armazenar dados no request para uso posterior
            const dadosPaciente = await require('../model/Pacientes').findOne({ user: user._id });
            const dadosMedico = await require('../model/Medicos').findOne({ user: user._id });
            req.user = {
                id: user._id,
                tipo: user.tipo,
                email: user.email,
                nome: user.nome,
                paciente: dadosPaciente,
                medico: dadosMedico
            };

            return next();
        } catch (err) {
            return res.status(401).json({
                data: null,
                message: 'Token inválido ou expirado'
            });
        }
    } catch (err) {
        return res.status(500).json({
            data: null,
            message: 'Erro na autenticação'
        });
    }
}

/**
 * Middleware de Autorização por Tipo
 * Verifica se o utilizador tem o tipo/papel correto
 */
function authorize(tiposPermitidos) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                data: null,
                message: 'Não autenticado'
            });
        }

        // Garantir que tiposPermitidos é um array
        const tipos = Array.isArray(tiposPermitidos) ? tiposPermitidos : [tiposPermitidos];

        if (!tipos.includes(req.user.tipo)) {
            return res.status(403).json({
                data: null,
                message: `Acesso negado. Acesso restrito a: ${tipos.join(', ')}`
            });
        }

        return next();
    };
}

/**
 * Middleware específico: Apenas Pacientes
 */
const requirePaciente = authorize('paciente');

/**
 * Middleware específico: Apenas Médicos
 */
const requireMedico = authorize('medico');

/**
 * Middleware específico: Apenas Admins
 */
const requireAdmin = authorize('admin');

/**
 * Middleware específico: Pacientes OU Médicos
 */
const requirePacienteOrMedico = authorize(['paciente', 'medico']);
const requirePacienteOrAdmin = authorize(['paciente', 'admin']);

/**
 * Middleware específico: Médicos OU Admins
 */
const requireMedicoOrAdmin = authorize(['medico', 'admin']);

/**
 * Middleware de Validação de Propriedade de Recurso
 * Verifica se o utilizador é proprietário do recurso ou admin
 * 
 * @param {string} modelName - Nome do modelo (ex: 'Consultas', 'Pacientes')
 * @param {string} ownerField - Campo que contém o ID do proprietário (ex: 'paciente', 'medico')
 * @param {string} paramName - Nome do parâmetro da rota (default: 'id')
 * 
 * Uso:
 * router.put('/:id', authenticate, validateResourceOwnership('Consultas', 'paciente'), controller.update);
 */
function validateResourceOwnership(modelName, ownerField, paramName = 'id') {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    data: null,
                    message: 'Não autenticado'
                });
            }

            const resourceId = req.params[paramName];

            // Admins podem alterar qualquer recurso
            if (req.user.tipo === 'admin') {
                return next();
            }

            // Obter o modelo dinamicamente
            let Model;
            try {
                Model = require(`../model/${modelName}`);
            } catch (err) {
                return res.status(500).json({
                    data: null,
                    message: `Modelo ${modelName} não encontrado`
                });
            }

            // Buscar o recurso
            const resource = await Model.findById(resourceId);
            if (!resource) {
                return res.status(404).json({
                    data: null,
                    message: `${modelName} não encontrado`
                });
            }

            // Verificar se o utilizador é proprietário
            const ownerId = resource[ownerField];
            if (ownerId.toString() !== req.user.id.toString()) {
                return res.status(403).json({
                    data: null,
                    message: 'Sem permissão para alterar este recurso'
                });
            }

            // Armazenar o recurso no request para uso posterior
            req.resource = resource;

            return next();
        } catch (err) {
            console.error('[validateResourceOwnership]', err);
            return res.status(500).json({
                data: null,
                message: 'Erro ao validar propriedade do recurso'
            });
        }
    };
}

/**
 * Middleware para validar propriedade de Consultas
 * Paciente ou Médico pode alterar sua própria consulta
 * Admins podem alterar qualquer consulta
 */
const validateConsultaOwnership = validateResourceOwnership('Consultas', 'paciente');

/**
 * Middleware personalizado para Consultas (valida paciente E médico)
 * Uma consulta pode ser alterada pelo paciente que a criou OU pelo médico designado
 */
function validateConsultaOwnershipAdvanced(req, res, next) {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    data: null,
                    message: 'Não autenticado'
                });
            }

            const resourceId = req.params.id;

            // Admins podem alterar qualquer recurso
            if (req.user.tipo === 'admin') {
                return next();
            }

            const Consultas = require('../model/Consultas');
            const consulta = await Consultas.findById(resourceId);

            if (!consulta) {
                return res.status(404).json({
                    data: null,
                    message: 'Consulta não encontrada'
                });
            }

            // Verificar se é paciente proprietário OU médico designado
            const isPacienteOwner = consulta.paciente.toString() === req.user.id.toString();
            const isMedicoAssigned = consulta.medico && consulta.medico.toString() === req.user.id.toString();

            if (!isPacienteOwner && !isMedicoAssigned) {
                return res.status(403).json({
                    data: null,
                    message: 'Sem permissão para alterar esta consulta'
                });
            }

            req.resource = consulta;
            return next();
        } catch (err) {
            console.error('[validateConsultaOwnershipAdvanced]', err);
            return res.status(500).json({
                data: null,
                message: 'Erro ao validar propriedade da consulta'
            });
        }
    };
}

module.exports = {
    authenticate,
    authorize,
    requirePaciente,
    requireMedico,
    requireAdmin,
    requirePacienteOrAdmin,
    requirePacienteOrMedico,
    requireMedicoOrAdmin,
    validateResourceOwnership,
    validateConsultaOwnership,
    validateConsultaOwnershipAdvanced
};
