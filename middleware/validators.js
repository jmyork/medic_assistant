/**
 * Middleware de Validação e Utilitários
 */

/**
 * Validar se um ID é um ObjectId MongoDB válido
 */
function validateObjectId(paramName = 'id') {
    return (req, res, next) => {
        const id = req.params[paramName];

        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                data: null,
                message: `${paramName} inválido`
            });
        }

        return next();
    };
}

/**
 * Middleware de erro global
 */
function errorHandler(err, req, res, next) {
    console.error('[ERROR]', err);

    // Erro de validação do Mongoose
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            data: null,
            message: 'Dados inválidos',
            errors: Object.values(err.errors).map(e => e.message)
        });
    }

    // Erro de ID inválido
    if (err.name === 'CastError') {
        return res.status(400).json({
            data: null,
            message: 'ID inválido'
        });
    }

    // Erro genérico
    return res.status(err.status || 500).json({
        data: null,
        message: err.message || 'Erro no servidor'
    });
}

module.exports = {
    validateObjectId,
    errorHandler
};
