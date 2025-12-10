const express = require('express');
const router = express.Router();

let useModel = null;
let modelLoaded = false;
let symptomEmbeddings = [];

// Mock database of symptoms (you can replace with real DB later)
const mockSymptoms = [
  { id: 1, name: 'Dor de cabeça', text: 'dor de cabeça, cefaleia, pressão na cabeça' },
  { id: 2, name: 'Febre', text: 'temperatura elevada, febre, calafrios' },
  { id: 3, name: 'Tosse', text: 'tosse seca ou produtiva, irritação na garganta' },
  { id: 4, name: 'Náusea', text: 'náuseas, vontade de vomitar, desconforto estomacal' },
  { id: 5, name: 'Dor abdominal', text: 'dor no abdômen, cólicas, sensibilidade' },
  { id: 6, name: 'Fadiga', text: 'cansaço extremo, falta de energia' },
  { id: 7, name: 'Dificuldade respiratória', text: 'falta de ar, respiração ofegante' },
  { id: 8, name: 'Dor no peito', text: 'dor torácica, pressão no peito, desconforto' }
];

// Load the model and precompute embeddings for mock symptoms
(async function initModel() {
  try {
    // Prefer tfjs-node for faster performance in Node
    require('@tensorflow/tfjs-node');
    const use = require('@tensorflow-models/universal-sentence-encoder');
    useModel = await use.load();

    const texts = mockSymptoms.map((s) => `${s.name} ${s.text || ''}`);
    const embeddingsTensor = await useModel.embed(texts);
    symptomEmbeddings = await embeddingsTensor.array();
    modelLoaded = true;
    console.log('[SymptomNLP] model loaded and embeddings precomputed');
  } catch (err) {
    console.error('[SymptomNLP] error initializing model', err);
  }
})();

function cosine(a, b) {
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  if (na === 0 || nb === 0) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

router.post('/match', async (req, res) => {
  const { text, topk = 5 } = req.body || {};
  if (!modelLoaded) return res.status(503).json({ message: 'Model not loaded yet' });
  if (!text || !String(text).trim()) return res.status(400).json({ message: 'Text is required' });

  try {
    const embeddingTensor = await useModel.embed([String(text)]);
    const embArray = await embeddingTensor.array();
    const emb = embArray[0];

    const scores = symptomEmbeddings.map((sEmb, idx) => ({
      id: mockSymptoms[idx].id,
      name: mockSymptoms[idx].name,
      text: mockSymptoms[idx].text,
      score: cosine(emb, sEmb),
    }));

    scores.sort((a, b) => b.score - a.score);
    const top = scores.slice(0, topk);
    return res.json({ data: top });
  } catch (err) {
    console.error('[SymptomNLP] /match error', err);
    return res.status(500).json({ message: err.message || 'Internal error' });
  }
});

// Optional endpoint to list mock symptoms
router.get('/mock-symptoms', (req, res) => {
  res.json({ data: mockSymptoms });
});

module.exports = router;
