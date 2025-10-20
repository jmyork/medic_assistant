const SintomaAnalise = require('../../model/analises/sintomas');

exports.getAll = async (req, res) => {
  try {
    const sintomas = await SintomaAnalise.find().populate('exame');
    res.json(sintomas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const sintoma = await SintomaAnalise.findById(req.params.id).populate('exame');
    if (!sintoma) return res.status(404).json({ message: 'Sintoma não encontrado' });
    res.json(sintoma);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const sintoma = new SintomaAnalise(req.body);
    await sintoma.save();
    res.status(201).json(sintoma);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const sintoma = await SintomaAnalise.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sintoma) return res.status(404).json({ message: 'Sintoma não encontrado' });
    res.json(sintoma);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const sintoma = await SintomaAnalise.findByIdAndDelete(req.params.id);
    if (!sintoma) return res.status(404).json({ message: 'Sintoma não encontrado' });
    res.json({ message: 'Sintoma removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
