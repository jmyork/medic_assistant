const Exame = require('../../model/analises/exames');

// GET /analises/exames
exports.getAll = async (req, res) => {
  try {
    const exames = await Exame.find().populate('paciente medico');
    res.json(exames);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /analises/exames/:id
exports.getById = async (req, res) => {
  try {
    const exame = await Exame.findById(req.params.id).populate('paciente medico');
    if (!exame) return res.status(404).json({ message: 'Exame não encontrado' });
    res.json(exame);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /analises/exames
exports.create = async (req, res) => {
  try {
    const exame = new Exame(req.body);
    await exame.save();
    res.status(201).json(exame);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /analises/exames/:id
exports.update = async (req, res) => {
  try {
    const exame = await Exame.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!exame) return res.status(404).json({ message: 'Exame não encontrado' });
    res.json(exame);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /analises/exames/:id
exports.remove = async (req, res) => {
  try {
    const exame = await Exame.findByIdAndDelete(req.params.id);
    if (!exame) return res.status(404).json({ message: 'Exame não encontrado' });
    res.json({ message: 'Exame removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
