# API Frontend - Guia de Uso

Este diretório contém todas as funções para comunicação com o backend da aplicação MedicAssistant.

## Estrutura

```
api/
├── apiURL.ts           # Endpoints da API
├── requests/
│   ├── index.ts        # Exportações centralizadas
│   ├── auth.ts         # Autenticação
│   ├── medicos.ts      # Operações com médicos
│   ├── sintomas.ts     # Operações com sintomas
│   ├── consultas.ts    # Operações com consultas
│   └── consultaSintomas.ts  # Operações com consulta-sintomas
```

## Uso

### Importação

```typescript
// Importar uma função específica
import { loginRequest } from "@/api/requests";

// Importar múltiplas funções
import {
  loginRequest,
  registerRequest,
  listConsultasRequest,
} from "@/api/requests";
```

## Exemplos de Uso

### Autenticação

#### Login

```typescript
const response = await loginRequest("user@example.com", "password123");
const data = await response.json();

if (response.ok) {
  const token = data.data.token;
  localStorage.setItem("token", token);
}
```

#### Registo

```typescript
const response = await registerRequest(
  "newoser@example.com",
  "password123",
  "paciente",
  "João Silva"
);
const data = await response.json();
```

#### Reset de Senha

```typescript
// Solicitar reset
const response1 = await requestPasswordResetRequest("user@example.com");

// Redefinir senha com token
const response2 = await resetPasswordRequest(token, "newPassword123");
```

### Médicos

#### Listar médicos

```typescript
const response = await listMedicosRequest();
const data = await response.json();
console.log(data.data); // Array de médicos
```

#### Obter um médico

```typescript
const response = await getMedicoRequest("medicoId");
const data = await response.json();
console.log(data.data); // Dados do médico
```

#### Criar médico (admin)

```typescript
const response = await createMedicoRequest(token, {
  user: "userId",
  especialidade: "Cardiologia",
});
const data = await response.json();
```

#### Atualizar médico

```typescript
const response = await updateMedicoRequest("medicoId", token, {
  especialidade: "Oftalmologia",
});
const data = await response.json();
```

#### Deletar médico (admin)

```typescript
const response = await deleteMedicoRequest("medicoId", token);
```

### Sintomas

#### Listar sintomas com paginação e busca

```typescript
const response = await listSintomasRequest({
  page: 1,
  limit: 20,
  q: "febre", // Buscar por nome
  sort: "nome", // Ordenar por nome
});
const data = await response.json();
console.log(data.data); // Array de sintomas
console.log(data.meta); // Informações de paginação
```

#### Obter um sintoma

```typescript
const response = await getSintomaRequest("sintomaId");
const data = await response.json();
```

#### Criar sintoma (admin)

```typescript
const response = await createSintomaRequest(token, {
  nome: "Febre",
  descricao: "Temperatura corporal elevada",
});
const data = await response.json();
```

#### Atualizar sintoma (admin)

```typescript
const response = await updateSintomaRequest("sintomaId", token, {
  descricao: "Nova descrição",
});
const data = await response.json();
```

#### Deletar sintoma (admin)

```typescript
const response = await deleteSintomaRequest("sintomaId", token);
```

### Consultas

#### Listar consultas (médicos)

```typescript
const response = await listConsultasRequest(token);
const data = await response.json();
console.log(data.data); // Array de consultas
```

#### Obter uma consulta

```typescript
const response = await getConsultaRequest("consultaId", token);
const data = await response.json();
```

#### Criar consulta (paciente)

```typescript
const response = await createConsultaRequest(token, {
  medico: "medicoId",
  recomendacoes_medicos: ["recomendacaoId1", "recomendacaoId2"],
  resultado: "Diagnóstico ou resultado",
  notas: "Observações adicionais",
});
const data = await response.json();
```

#### Atualizar consulta

```typescript
const response = await updateConsultaRequest("consultaId", token, {
  resultado: "Novo resultado",
});
const data = await response.json();
```

#### Aprovar consulta (médico)

```typescript
const response = await approveConsultaRequest("consultaId", token);
const data = await response.json();
```

#### Cancelar consulta

```typescript
const response = await cancelConsultaRequest("consultaId", token);
const data = await response.json();
```

#### Marcar como realizada (médico)

```typescript
const response = await markConsultaAsDoneRequest("consultaId", token);
const data = await response.json();
```

#### Fazer diagnóstico (médico)

```typescript
const response = await diagnoseConsultaRequest("consultaId", token);
const data = await response.json();
console.log(data.data); // Resultado do diagnóstico
```

#### Deletar consulta (admin)

```typescript
const response = await deleteConsultaRequest("consultaId", token);
```

### Consulta-Sintomas

#### Listar sintomas de uma consulta

```typescript
const response = await listConsultaSintomasRequest("consultaId", token);
const data = await response.json();
console.log(data.data); // Array de sintomas associados
```

#### Criar associação consulta-sintoma

```typescript
const response = await createConsultaSintomaRequest(token, {
  sintomas: ["sintomaId1", "sintomaId2"],
  consulta: "consultaId",
});
const data = await response.json();
```

#### Deletar associação

```typescript
const response = await deleteConsultaSintomaRequest("associacaoId", token);
```

### Pacientes

#### Listar pacientes (médicos/admin)

```typescript
const response = await listPacientesRequest(token);
const data = await response.json();
console.log(data.data); // Array de pacientes
```

#### Obter um paciente

```typescript
const response = await getPacienteRequest("pacienteId", token);
const data = await response.json();
```

#### Criar paciente (autenticado)

```typescript
const response = await createPacienteRequest(token, {
  nome: "Maria Silva",
  documento: "123456789",
  peso: 65,
  altura: 1.7,
  data_nascimento: "1990-01-15",
  genero: "F",
  contacto: "912345678",
  endereco: "Rua Exemplo, 123",
  predisposicoes: ["hipertensão", "diabetes"],
});
const data = await response.json();
```

#### Atualizar paciente

```typescript
const response = await updatePacienteRequest("pacienteId", token, {
  peso: 70,
  altura: 1.72,
});
const data = await response.json();
```

#### Deletar paciente (admin)

```typescript
const response = await deletePacienteRequest("pacienteId", token);
```

#### Obter detalhes do paciente (dados formatados)

```typescript
// Obter dados do paciente autenticado
const response = await getPacienteDetailsRequest(token);
const data = await response.json();

const pacienteDetails = data.data; // Contém:
// {
//   name: string,
//   bi: string,
//   email: string,
//   weight: string,
//   height: string,
//   chronicDiseases: string[],
//   pacienteId: string,
//   dataNascimento: string,
//   genero: string,
//   contacto: string,
//   endereco: string
// }
```

#### Obter histórico de consultas e sintomas

```typescript
const response = await getPacienteHistoryRequest(token, "pacienteId");
const data = await response.json();

// Retorna array de histórico com estrutura:
// {
//   id: string,
//   date: string (YYYY-MM-DD),
//   symptoms: string[],
//   intensity: string,
//   status: string
// }

console.log(data.data); // Histórico de sintomas
```

#### Obter sintomas atuais do paciente

````typescript
const response = await getPacienteSymptomsRequest(token, "pacienteId");
const data = await response.json();

// Retorna o histórico mais recente com sintomas
const recentSymptoms = data.data[0]; // Última consulta
console.log(recentSymptoms.symptoms); // Array de sintomas

Todas as funções retornam um objeto `Response`. Verifique `response.ok` ou `response.status`:

```typescript
try {
  const response = await loginRequest(email, password);

  if (!response.ok) {
    const error = await response.json();
    console.error("Erro:", error.message);
    return;
  }

  const data = await response.json();
  console.log("Sucesso:", data);
} catch (e) {
  console.error("Erro de rede:", e);
}
````

## Autenticação

A maioria dos endpoints requer um token JWT. Obtenha o token no login e passe-o em cada requisição:

```typescript
const token = localStorage.getItem("token");
await listConsultasRequest(token);
```

## Status HTTP Comuns

- `200` - OK
- `201` - Criado com sucesso
- `204` - Sem conteúdo (sucesso)
- `400` - Requisição inválida
- `401` - Não autenticado
- `403` - Não autorizado
- `404` - Não encontrado
- `409` - Conflito (ex: email já existe)
- `500` - Erro do servidor
