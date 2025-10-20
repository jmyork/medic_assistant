# 🩺 Medical Assistant

Um sistema inteligente de assistência médica que analisa sintomas, histórico do paciente e fatores de risco para fornecer recomendações personalizadas de saúde usando a MERN Stack.

## ✨ Funcionalidades Principais

- **Análise de Sintomas**: Cruzamento inteligente entre sintomas reportados e condições médicas
- **Histórico Completo**: Integração com histórico médico familiar e pessoal
- **Recomendações Personalizadas**:
  - Planos de exercícios específicos
  - Orientação nutricional (alimentos a evitar e priorizar)
  - Recomendações de estilo de vida
  - Alertas para condições pré-existentes
- **Gestão de Pacientes**: Acompanhamento contínuo e evolução do estado de saúde
- **Sistema de Triagem**: Identificação de predisposições e fatores de risco

## 🛠 Tecnologias Utilizadas

- **MongoDB** - Banco de dados NoSQL
- **Express.js** - Framework backend
- **React.js** - Framework frontend
- **Node.js** - Runtime environment
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação
- **BCrypt** - Criptografia de senhas

## 🗃 Estrutura do Banco de Dados

### Tabelas Principais:

#### Core Médico
- **doenças** - Catálogo de doenças e condições
- **sintomas** - Catálogo de sintomas possíveis
- **doencas_sintomas** - Relacionamento doenças/sintomas

#### Gestão de Pacientes
- **pacientes** - Dados demográficos e informações básicas
- **paciente_sintomas** - Sintomas reportados por pacientes
- **paciente_predisposicao** - Histórico familiar e fatores de risco

#### Sistema de Recomendações
- **sintomas_recomendações** - Regras de recomendação baseadas em sintomas

#### Infraestrutura Médica
- **medico** - Cadastro de profissionais
- **hospital** - Instituições médicas
- **hospital_medico** - Relacionamento hospitais/médicos

#### Gestão de Atendimentos
- **paciente_atendimento** - Registros de consultas
- **atendimento_medico** - Vinculação médico/atendimento
- **receita_atendimento** - Prescrições e orientações

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js 16+
- MongoDB 4.4+
- npm ou yarn

### Passos de Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/jmyork/medic_assistant
cd medic_assistant
```

2. **Instale as dependências do backend**
```bash
cd backend
npm install
```

3. **Instale as dependências do frontend**
```bash
cd ../frontend
npm install
```

4. **Configure as variáveis de ambiente**
```bash
# backend/.env
MONGODB_URI=mongodb://localhost:27017/medical_assistant
JWT_SECRET=seu_jwt_secret
PORT=5000
```

5. **Execute a aplicação**
```bash
# Backend (terminal 1)
cd backend
npm run dev

# Frontend (terminal 2)  
cd frontend
npm start
```

## 📋 Fluxo do Sistema

### 1. Cadastro do Paciente
- Coleta de dados pessoais e demográficos
- Registro de histórico médico familiar
- Identificação de condições pré-existentes

### 2. Relato de Sintomas
- Interface intuitiva para descrição de sintomas
- Escala de intensidade e duração
- Frequência e padrões temporais

### 3. Análise Inteligente
- Cruzamento com base de dados médica
- Consideração de histórico e predisposições
- Identificação de padrões e correlações

<!-- ### 4. Geração de Relatório
```json
{
  "diagnostico_tendencial": "Possível condição X baseado em sintomas A, B, C",
  "recomendacoes_exercicios": [
    "Caminhada leve 30min/dia",
    "Exercícios de alongamento matinal"
  ],
  "alimentacao": {
    "evitar": ["Alimentos processados", "Açúcar refinado"],
    "aconselhados": ["Frutas ricas em antioxidantes", "Vegetais verdes"]
  },
  "estilo_vida": [
    "Manter horário regular de sono",
    "Praticar técnicas de relaxamento"
  ],
  "alertas_condicoes": [
    "Monitorar sintoma Y devido histórico familiar"
  ]
}
``` -->

## 🔧 API Endpoints Principais

### Pacientes
- `POST /api/pacientes` - Cadastrar novo paciente
- `GET /api/pacientes/:id` - Obter dados do paciente
- `PUT /api/pacientes/:id/sintomas` - Registrar sintomas

### Análise Médica
- `POST /api/analise/sintomas` - Submeter sintomas para análise
- `GET /api/analise/:pacienteId/recomendacoes` - Obter recomendações

### Médicos
- `GET /api/medicos` - Listar médicos disponíveis
- `POST /api/atendimentos` - Registrar atendimento

## 🎯 Exemplo de Uso

```javascript
// Submissão de sintomas
const sintomasPaciente = {
  pacienteId: "12345",
  sintomas: [
    { sintomaId: "S001", intensidade: 7, duracao: "3 dias" },
    { sintomaId: "S045", intensidade: 5, duracao: "1 semana" }
  ],
  historicoRecent: "Última consulta: 2 meses atrás",
  observacoes: "Sintomas pioram à noite"
};

// Resposta do sistema
const recomendacoes = {
  risco: "moderado",
  acoesImediatas: [
    "Agendar consulta com clínico geral",
    "Manter repouso relativo"
  ],
  planoLongoPrazo: {
    exercicios: [...],
    alimentacao: {...},
    monitoramento: [...]
  }
};
```

## 🔒 Segurança e Privacidade

- Criptografia de dados sensíveis
- Autenticação JWT
- Controle de acesso baseado em roles
- Auditoria de acessos aos registros médicos
- Conformidade com LGPD


## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## ⚠️ Aviso Legal

Este sistema é uma ferramenta de apoio à decisão médica e não substitui o diagnóstico profissional. Todas as recomendações devem ser validadas por um médico qualificado.

## 📞 Suporte

Para suporte técnico ou dúvidas sobre o sistema, entre em contato através do email: josemanuelbaptistatest@gmail.com

---

**Desenvolvido com ❤️ para melhorar a saúde e qualidade de vida dos pacientes**
