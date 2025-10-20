const RecomendacaoDoenca = require('../../model/doencas/recomendacao');

exports.getAll = async (req, res) => {
    try {
        const recomendacoes = await RecomendacaoDoenca.find().populate('doenca medico paciente');
        res.json(recomendacoes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const recomendacao = await RecomendacaoDoenca.findById(req.params.id).populate('doenca medico paciente');
        if (!recomendacao) return res.status(404).json({ message: 'Recomendação não encontrada' });
        res.json(recomendacao);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const recomendacao = new RecomendacaoDoenca(req.body);
        await recomendacao.save();
        res.status(201).json(recomendacao);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const recomendacao = await RecomendacaoDoenca.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!recomendacao) return res.status(404).json({ message: 'Recomendação não encontrada' });
        res.json(recomendacao);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const recomendacao = await RecomendacaoDoenca.findByIdAndDelete(req.params.id);
        if (!recomendacao) return res.status(404).json({ message: 'Recomendação não encontrada' });
        res.json({ message: 'Recomendação removida com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
