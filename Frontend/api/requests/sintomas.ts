import { endpoint } from "../apiURL";

interface SintomaData {
    nome: string;
    descricao?: string;
    [key: string]: any;
}

interface ListSintomasParams {
    page?: number;
    limit?: number;
    q?: string;
    sort?: string;
}

/**
 * Listar todos os sintomas com paginação e busca
 * @param params - Parâmetros de listagem (page, limit, q, sort)
 */
export const listSintomasRequest = async (params?: ListSintomasParams) => {
    try {
        const queryParams = new URLSearchParams();

        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.q) queryParams.append("q", params.q);
        if (params?.sort) queryParams.append("sort", params.sort);

        const url =
            queryParams.toString()
                ? `${endpoint.sintomas}?${queryParams.toString()}`
                : endpoint.sintomas;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response;
    } catch (e) {
        console.error("Erro ao listar sintomas", e);
        throw e;
    }
};

/**
 * Obter um sintoma específico
 * @param id - ID do sintoma
 */
export const getSintomaRequest = async (id: string) => {
    try {
        const response = await fetch(endpoint.sintomaById(id), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response;
    } catch (e) {
        console.error("Erro ao obter sintoma", e);
        throw e;
    }
};

/**
 * Criar um novo sintoma (requer autenticação de admin)
 * @param token - Token de autenticação
 * @param sintomaData - Dados do sintoma
 */
export const createSintomaRequest = async (
    token: string,
    sintomaData: SintomaData
) => {
    try {
        const response = await fetch(endpoint.sintomas, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(sintomaData),
        });

        return response;
    } catch (e) {
        console.error("Erro ao criar sintoma", e);
        throw e;
    }
};

/**
 * Atualizar um sintoma (requer autenticação de admin)
 * @param id - ID do sintoma
 * @param token - Token de autenticação
 * @param sintomaData - Dados a atualizar
 */
export const updateSintomaRequest = async (
    id: string,
    token: string,
    sintomaData: Partial<SintomaData>
) => {
    try {
        const response = await fetch(endpoint.sintomaById(id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(sintomaData),
        });

        return response;
    } catch (e) {
        console.error("Erro ao atualizar sintoma", e);
        throw e;
    }
};

/**
 * Deletar um sintoma (requer autenticação de admin)
 * @param id - ID do sintoma
 * @param token - Token de autenticação
 */
export const deleteSintomaRequest = async (id: string, token: string) => {
    try {
        const response = await fetch(endpoint.sintomaById(id), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (e) {
        console.error("Erro ao deletar sintoma", e);
        throw e;
    }
};
