const Consultas = require('../model/Consultas');
const Pacientes = require('../model/Pacientes');
const Medicos = require('../model/Medicos');
const Recomendacoes = require('../model/Recomendacoes');
const ConsultasSintomas = require('../model/ConsultaSintomas');
const Sintomas = require("../model/Sintomas")
const Doencas = require("../model/Doencas");
const DoencasSintomas = require('../model/DoencasSintomas');
const Users = require('../model/Users');

// const tf = require('@tensorflow/tfjs-node');
// Regras principais:
// - paciente e medico são obrigatórios e devem existir
// - data_hora é obrigatória; uma vez criada, é imutável (model já define immutable)
// - quando resultado for referência para Doencas, o serviço deve permitir ObjectId ou texto

async function create(req, res, next) {
    try {
        const { medico } = req.body;
        const paciente = req.user.paciente._id
        // console.log("paciente :", req.user)

        // if (!paciente) return res.status(400).json({ data: null, message: 'paciente é obrigatório' });
        // if (!medico) return res.status(400).json({ data: null, message: 'medico é obrigatório' });
        // if (!data_hora) return res.status(400).json({ data: null, message: 'data_hora é obrigatória' }); 
        const data_hora = new Date();

        const p = await Pacientes.findById(paciente);
        if (!p) return res.status(400).json({ data: null, message: 'paciente não encontrado' });
        // const m = await Medicos.findById(medico);
        // if (!m) return res.status(400).json({ data: null, message: 'medico não encontrado' });

        // Validação das recomendacoes se fornecidas
        if (req.body.recomendacoes_medicos && req.body.recomendacoes_medicos.length) {
            const recCount = await Recomendacoes.countDocuments({ _id: { $in: req.body.recomendacoes_medicos } });
            if (recCount !== req.body.recomendacoes_medicos.length)
                return res.status(400).json({ data: null, message: 'algumas recomendacoes_medicos não existem' });
        }

        const consulta = new Consultas({ ...req.body, paciente: paciente, data_hora: data_hora });
        await consulta.save();
        return res.status(201).json({ data: consulta, message: 'Consulta criada com sucesso' });
    } catch (err) {
        next(err);
    }
}

async function list(req, res, next) {
    try {
        const list = await Consultas.find().populate('paciente medico recomendacoes_medicos').lean();
        return res.status(200).json({ data: list, message: 'Lista de consultas obtida com sucesso' });
    } catch (err) {
        next(err);
    }
}

async function get(req, res, next) {
    try {
        const { id } = req.params;
        const item = await Consultas.findById(id).populate('paciente medico recomendacoes_medicos').lean();
        if (!item) return res.status(404).json({ data: null, message: 'Consulta não encontrada' });
        return res.status(200).json({ data: item, message: 'Consulta obtida com sucesso' });
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const { id } = req.params;
        // não permitir alteração da data_hora (model define immutable, mas bloqueamos por segurança)
        if (req.body.data_hora) return res.status(400).json({ data: null, message: 'data_hora é imutável' });

        const updates = req.body;
        if (updates.paciente) {
            const p = await Pacientes.findById(updates.paciente);
            if (!p) return res.status(400).json({ data: null, message: 'paciente não encontrado' });
        }
        if (updates.medico) {
            const m = await Medicos.findById(updates.medico);
            if (!m) return res.status(400).json({ data: null, message: 'medico não encontrado' });
        }

        const consulta = await Consultas.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!consulta) return res.status(404).json({ data: null, message: 'Consulta não encontrada' });
        return res.status(200).json({ data: consulta, message: 'Consulta atualizada com sucesso' });
    } catch (err) {
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        const { id } = req.params;
        const removed = await Consultas.findByIdAndDelete(id);
        if (!removed) return res.status(404).json({ data: null, message: 'Consulta não encontrada' });
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
}

async function approve(req, res, auth, next) {
    try {
        const { id } = req.params;
        const consulta = await Consultas.findById(id);
        if (!consulta) return res.status(404).json({ data: null, message: 'Consulta não encontrada' })
        consulta.status = 'aprovada';
        consulta.medico = auth.userId
        await consulta.save();
        return res.status(200).json({ data: consulta, message: 'Consulta aprovada com sucesso' });
    } catch (err) {
        next(err);
    }
}
async function cancel(req, res, next) {
    try {
        const { id } = req.params;
        const consulta = await Consultas.findById(id);
        if (!consulta) return res.status(404).json({ data: null, message: 'Consulta não encontrada' })
        consulta.status = 'cancelada';
        await consulta.save();
        return res.status(200).json({ data: consulta, message: 'Consulta cancelada com sucesso' });
    } catch (err) {
        next(err);
    }
}
async function markAsDone(req, res, next) {
    try {
        const { id } = req.params;
        const consulta = await Consultas.findById(id);
        if (!consulta) return res.status(404).json({ data: null, message: 'Consulta não encontrada' })
        consulta.status = 'realizada';
        await consulta.save();
        return res.status(200).json({ data: consulta, message: 'Consulta marcada como realizada com sucesso' });
    } catch (err) {
        next(err);
    }
}

// calcular a doença mais provável com base nos sintomas fornecidos
async function diagnose(req, res, next) {
    try {
        // implementar lógica de diagnóstico aqui
        const sintomas = await Sintomas.find().select("nome").lean()
        const doencas = await Doencas.find().select("nome").lean()
        // ---------------------------------------
        // 1) Preparar dados de treinamento
        // ---------------------------------------
        const sintomaIndex = {};
        sintomas.find().forEach((s, i) => sintomaIndex[s._id] = i);
        // ---------------------------------------
        // ---------------------------------------
        // 2) Construir matrizes X e y
        // ---------------------------------------
        const X = [];
        const y = [];
        for (const d of doencas) {
            // busca todos sintomas daquela doença
            const rels = await DoencasSintomas.find({ doenca: d._id });

            // linha binária
            const linha = Array(sintomas.length).fill(0);
            for (const r of rels) {
                const idx = sintomaIndex[r.sintoma];
                linha[idx] = 1;
            }

            X.push(linha);
            y.push(doencas.findIndex(x => x._id === d._id));
        }


        const Xtensor = tf.tensor2d(X);
        const ytensor = tf.tensor1d(y, 'int32');

        // ---------------------------------------
        // 3) Criar modelo (multiclasse)
        // ---------------------------------------
        const model = tf.sequential();
        model.add(tf.layers.dense({ inputShape: [sintomas.length], units: 32, activation: 'relu' }));
        model.add(tf.layers.dense({ units: doencas.length, activation: 'softmax' }));

        model.compile({
            optimizer: tf.train.adam(0.01),
            loss: 'sparseCategoricalCrossentropy',
            metrics: ['accuracy'],
        });

        // ---------------------------------------
        // 4) Treinar
        // ---------------------------------------
        console.log("A treinar...");
        await model.fit(Xtensor, ytensor, {
            epochs: 30,
            batchSize: 4,
            verbose: 1
        });

        // Guardar modelo
        await model.save("file://./modelo-doencas");

        // ---------------------------------------
        // 5) Função de previsão
        // ---------------------------------------
        async function preverDoenca(idsSintomasSelecionados) {
            const linha = Array(sintomas.length).fill(0);

            for (const id of idsSintomasSelecionados) {
                const idx = sintomaIndex[id];
                if (idx !== undefined) linha[idx] = 1;
            }

            const entrada = tf.tensor2d([linha]);
            const pred = model.predict(entrada);
            const probs = await pred.data();

            const maxIdx = probs.indexOf(Math.max(...probs));
            return {
                doencaPrevista: doencas[maxIdx].nome,
                probabilidades: doencas.map((d, i) => ({ d: d.nome, p: probs[i] }))
            };
        }
        // ---------------------------------------
        // 6) Exemplo real de previsão
        // ---------------------------------------

        // EXEMPLO:
        // sintomas: febre, tosse
        const febreId = sintomas.find(s => s.nome === "febre")._id;
        const tosseId = sintomas.find(s => s.nome === "tosse")._id;

        // const resultado = await preverDoenca([febreId, tosseId]);
        console.log(resultado);

        return res.status(200).json({ message: 'Diagnóstico realizado com sucesso', data: resultado });
    } catch (err) {
        next(err);
    }
}

async function getValidatedReports(req, res, next) {
    try {
        let filter = {}
        if (req.query.status)
            filter = { status: { $in: req.query.status.split(",") } }

        // Buscar consultas com status 'realizada' (validadas/aprovadas)
        const consultas = await Consultas.find(filter).populate('paciente', 'nome')
            .populate('medico', 'user')
            .lean();
        // Formatar os dados conforme esperado pelo frontend
        const validatedReports = await Promise.all(
            consultas.map(async (consulta) => {
                // Buscar sintomas associados à consulta
                const consultaSintomas = await ConsultasSintomas.find({
                    consulta: consulta._id
                }).populate('sintoma', 'nome').lean();

                const symptoms = consultaSintomas.map(cs => cs.sintoma.nome);

                // Buscar nome do médico
                let medicoName = 'Médico';
                if (consulta.medico && consulta.medico.user) {
                    const medicoUser = await require('../model/Users').findById(consulta.medico.user).select('nome').lean();
                    if (medicoUser) {
                        medicoName = medicoUser.nome;
                    }
                }

                return {
                    id: consulta._id.toString(),
                    patientName: consulta.paciente?.nome || 'Paciente Desconhecido',
                    patientNumber: `MED-${consulta._id.toString().slice(10)}`,
                    date: consulta.data_hora.toISOString().split('T')[0],
                    symptoms: symptoms.length > 0 ? symptoms : ['Nenhum sintoma registrado'],
                    status: consulta.status,
                    validatedBy: medicoName,
                };
            })
        );


        return res.status(200).json({
            data: validatedReports,
            message: 'Relatórios validados obtidos com sucesso'
        });
    } catch (err) {
        next(err);
    }
}

async function getConsultaDetails(req, res, next) {
    try {
        let filter = { _id: req.params.id }
        if (req.query.status)
            filter = { status: { $in: req.query.status.split(",") } }


        // Buscar consultas com status 'realizada' (validadas/aprovadas)
        const consultas = await Consultas.find(filter).populate('paciente', 'nome altura peso data_nascimento documento')
            .populate('medico', 'user')
            .lean();

        const qtd = await Consultas.countDocuments({ paciente: consultas[0].paciente._id });

        // Formatar os dados conforme esperado pelo frontend
        const validatedReports = await Promise.all(
            consultas.map(async (consulta) => {
                // Buscar sintomas associados à consulta
                const consultaSintomas = await ConsultasSintomas.find({
                    consulta: consulta._id
                }).populate('sintoma', 'nome').lean();

                const symptoms = consultaSintomas.map(cs => cs.sintoma.nome);

                // Buscar nome do médico
                let medicoName = 'Médico';
                if (consulta.medico && consulta.medico.user) {
                    const medicoUser = await require('../model/Users').findById(consulta.medico.user).select('nome').lean();
                    if (medicoUser) {
                        medicoName = medicoUser.nome;
                    }
                }

                return {
                    id: consulta._id.toString(),
                    patientName: consulta.paciente?.nome || 'Paciente Desconhecido',
                    height: consulta.paciente.altura,
                    quantidade_consultas: qtd,
                    weight: consulta.paciente.peso,
                    data_consulta: consulta.data_hora,
                    data_nascimento: consulta.paciente.data_nascimento,
                    documento: consulta.paciente.documento,
                    patientNumber: `MED-${consulta._id.toString().slice(10)}`,
                    date: consulta.data_hora.toISOString().split('T')[0],
                    symptoms: symptoms.length > 0 ? symptoms : ['Nenhum sintoma registrado'],
                    status: consulta.status,
                    validatedBy: medicoName,
                };
            })
        );


        return res.status(200).json({
            data: validatedReports[0],
            message: 'Relatórios validados obtidos com sucesso'
        });
    } catch (err) {
        next(err);
    }
}
module.exports = { create, list, get, update, remove, approve, cancel, markAsDone, diagnose, getValidatedReports, getConsultaDetails };
