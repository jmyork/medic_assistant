const Sintomas = require('../model/Sintomas');

exports.create = async (req, res, next) => {
    try { if (!req.body.nome) return res.status(400).json({ message: 'nome é obrigatório' }); const s = new Sintomas(req.body); await s.save(); res.status(201).json(s); } catch (err) { next(err); }
};

exports.list = async (req, res, next) => { try { const all = await Sintomas.find().lean(); res.json(all); } catch (err) { next(err); } };

exports.get = async (req, res, next) => { try { const item = await Sintomas.findById(req.params.id).lean(); if (!item) return res.status(404).json({ message: 'Sintoma não encontrado' }); res.json(item); } catch (err) { next(err); } };

exports.update = async (req, res, next) => { try { const updated = await Sintomas.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); if (!updated) return res.status(404).json({ message: 'Sintoma não encontrado' }); res.json(updated); } catch (err) { next(err); } };

exports.remove = async (req, res, next) => { try { const removed = await Sintomas.findByIdAndDelete(req.params.id); if (!removed) return res.status(404).json({ message: 'Sintoma não encontrado' }); res.status(204).send(); } catch (err) { next(err); } };
