import { endpoint } from "../apiURL";

interface MedicoData {
    user?: string;
    especialidade: string;
    [key: string]: any;
}

/**
 * Listar todos os médicos
 */
export const listMedicosRequest = async () => {
    try {
        const response = await fetch(endpoint.medicos, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response;
    } catch (e) {
        console.error("Erro ao listar médicos", e);
        throw e;
    }
};

/**
 * Obter um médico específico
 * @param id - ID do médico
 */
export const getMedicoRequest = async (id: string) => {
    try {
        const response = await fetch(endpoint.medicoById(id), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response;
    } catch (e) {
        console.error("Erro ao obter médico", e);
        throw e;
    }
};

/**
 * Criar um novo médico (requer autenticação de admin)
 * @param token - Token de autenticação
 * @param medicoData - Dados do médico (user, especialidade, etc)
 */
export const createMedicoRequest = async (
    token: string,
    medicoData: MedicoData
) => {
    try {
        const response = await fetch(endpoint.medicos, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(medicoData),
        });

        return response;
    } catch (e) {
        console.error("Erro ao criar médico", e);
        throw e;
    }
};

/**
 * Atualizar um médico (requer autenticação)
 * @param id - ID do médico
 * @param token - Token de autenticação
 * @param medicoData - Dados a atualizar
 */
export const updateMedicoRequest = async (
    id: string,
    token: string,
    medicoData: Partial<MedicoData>
) => {
    try {
        const response = await fetch(endpoint.medicoById(id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(medicoData),
        });

        return response;
    } catch (e) {
        console.error("Erro ao atualizar médico", e);
        throw e;
    }
};

/**
 * Deletar um médico (requer autenticação de admin)
 * @param id - ID do médico
 * @param token - Token de autenticação
 */
export const deleteMedicoRequest = async (id: string, token: string) => {
    try {
        const response = await fetch(endpoint.medicoById(id), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (e) {
        console.error("Erro ao deletar médico", e);
        throw e;
    }
};
