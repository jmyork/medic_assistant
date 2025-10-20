const Doenca = require('../../model/doencas/doenca');

exports.getAll = async (req, res) => {
  try {
    const doencas = await Doenca.find().populate('sintomas recomendacoes');
    res.json(doencas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const doenca = await Doenca.findById(req.params.id).populate('sintomas recomendacoes');
    if (!doenca) return res.status(404).json({ message: 'Doença não encontrada' });
    res.json(doenca);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const doenca = new Doenca(req.body);
    await doenca.save();
    res.status(201).json(doenca);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const doenca = await Doenca.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doenca) return res.status(404).json({ message: 'Doença não encontrada' });
    res.json(doenca);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const doenca = await Doenca.findByIdAndDelete(req.params.id);
    if (!doenca) return res.status(404).json({ message: 'Doença não encontrada' });
    res.json({ message: 'Doença removida com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
