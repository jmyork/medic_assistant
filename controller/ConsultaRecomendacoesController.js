const ConsultaRecomendacoes = require('../model/ConsultaRecomendacoes');

// Regras importantes extraídas do model:
// - nome é obrigatório
// - minimo_normal < maximo_normal (validação já no model)

async function create(req, res, next) {
    try {
        if (!req.body.nome) return res.status(400).json({ message: 'nome é obrigatório' });
        const exame = new ConsultaRecomendacoes(req.body);
        await exame.save();
        res.status(201).json(exame);
    } catch (err) {
        next(err);
    }
}

async function list(req, res, next) {
    try {
        const all = await ConsultaRecomendacoes.find().lean();
        res.json({data:all,message:"Lista de ConsultaRecomendacoes obtida com sucesso" });
    } catch (err) {
        next(err);
    }
}

async function get(req, res, next) {
    try {
        const exame = await ConsultaRecomendacoes.findById(req.params.id).lean();
        if (!exame) return res.status(404).json({ message: 'Exame não encontrado' });
        res.json({data:exame,message:"Exame obtido com sucesso" });
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const updated = await ConsultaRecomendacoes.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ message: 'Exame não encontrado' });
        res.json({data:updated,message:"Exame atualizado com sucesso" });
    } catch (err) {
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        const removed = await ConsultaRecomendacoes.findByIdAndDelete(req.params.id);
        if (!removed) return res.status(404).json({ message: 'Exame não encontrado' });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}

module.exports = { create, list, get, update, remove };
