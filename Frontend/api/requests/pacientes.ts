import { endpoint } from "../apiURL";

interface PacienteData {
    nome: string;
    documento?: string;
    peso?: number;
    altura?: number;
    data_nascimento?: string;
    genero?: string;
    contacto?: string;
    endereco?: string;
    predisposicoes?: string[];
    numero_seguranca_social?: string;
    [key: string]: any;
}

interface PacienteDetailsResponse {
    name: string;
    bi: string;
    email: string;
    weight: string;
    height: string;
    chronicDiseases: string[];
    pacienteId: string;
    dataNascimento: string;
    genero: string;
    contacto: string;
    endereco: string;
}

interface SymptomsHistoryItem {
    id: string;
    date: string;
    symptoms: string[];
    intensity: string;
    status: string;
}

/**
 * Listar todos os pacientes (requer autenticação de médico/admin)
 * @param token - Token de autenticação
 */
export const listPacientesRequest = async (token: string) => {
    try {
        const response = await fetch(endpoint.pacientes, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (e) {
        console.error("Erro ao listar pacientes", e);
        throw e;
    }
};

/**
 * Obter um paciente específico
 * @param id - ID do paciente
 * @param token - Token de autenticação
 */
export const getPacienteRequest = async (id: string, token: string) => {
    try {
        const response = await fetch(endpoint.pacienteById(id), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (e) {
        console.error("Erro ao obter paciente", e);
        throw e;
    }
};

/**
 * Criar um novo paciente (requer autenticação)
 * @param token - Token de autenticação
 * @param pacienteData - Dados do paciente
 */
export const createPacienteRequest = async (
    token: string,
    pacienteData: PacienteData
) => {
    try {
        const response = await fetch(endpoint.pacientes, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(pacienteData),
        });

        return response;
    } catch (e) {
        console.error("Erro ao criar paciente", e);
        throw e;
    }
};

/**
 * Atualizar um paciente
 * @param id - ID do paciente
 * @param token - Token de autenticação
 * @param pacienteData - Dados a atualizar
 */
export const updatePacienteRequest = async (
    id: string,
    token: string,
    pacienteData: Partial<PacienteData>
) => {
    try {
        const response = await fetch(endpoint.pacienteById(id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(pacienteData),
        });

        return response;
    } catch (e) {
        console.error("Erro ao atualizar paciente", e);
        throw e;
    }
};

/**
 * Deletar um paciente (requer autenticação de admin)
 * @param id - ID do paciente
 * @param token - Token de autenticação
 */
export const deletePacienteRequest = async (id: string, token: string) => {
    try {
        const response = await fetch(endpoint.pacienteById(id), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (e) {
        console.error("Erro ao deletar paciente", e);
        throw e;
    }
};

/**
 * Obter dados do paciente autenticado (com detalhes formatados)
 * @param token - Token de autenticação
 * @param patientId - ID do paciente (opcional, se não fornecido usa do utilizador autenticado)
 */
export const getPacienteDetailsRequest = async (
    token: string,
    patientId?: string
): Promise<Response> => {
    try {
        const url = patientId
            ? endpoint.pacienteDetails(patientId)
            : endpoint.pacienteDetails();

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (e) {
        console.error("Erro ao obter detalhes do paciente", e);
        throw e;
    }
};

/**
 * Obter histórico de consultas e sintomas do paciente
 * @param token - Token de autenticação
 * @param patientId - ID do paciente
 */
export const getPacienteHistoryRequest = async (
    token: string,
    patientId: string
): Promise<Response> => {
    try {
        const response = await fetch(endpoint.pacienteHistory(patientId), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (e) {
        console.error("Erro ao obter histórico do paciente", e);
        throw e;
    }
};

/**
 * Obter sintomas atuais do paciente (última consulta ou consulta específica)
 * @param token - Token de autenticação
 * @param patientId - ID do paciente
 */
export const getPacienteSymptomsRequest = async (
    token: string,
    patientId: string
): Promise<Response> => {
    try {
        // Esta função usa o endpoint de histórico e retorna os sintomas mais recentes
        const response = await getPacienteHistoryRequest(token, patientId);
        return response;
    } catch (e) {
        console.error("Erro ao obter sintomas do paciente", e);
        throw e;
    }
};
