const Bula = require('../../model/analises/bula');
const a=require("")

exports.getAll = async (req, res) => {
  try {
    const bulas = await Bula.find().populate('medicamento');
    res.json(bulas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const bula = await Bula.findById(req.params.id).populate('medicamento');
    if (!bula) return res.status(404).json({ message: 'Bula não encontrada' });
    res.json(bula);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const bula = new Bula(req.body);
    await bula.save();
    res.status(201).json(bula);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const bula = await Bula.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bula) return res.status(404).json({ message: 'Bula não encontrada' });
    res.json(bula);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const bula = await Bula.findByIdAndDelete(req.params.id);
    if (!bula) return res.status(404).json({ message: 'Bula não encontrada' });
    res.json({ message: 'Bula removida com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
