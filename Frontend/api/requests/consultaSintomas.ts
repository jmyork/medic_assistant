import { endpoint } from "../apiURL";

interface ConsultaSintomaData {
    sintomas: string[];
    consulta: string;
}

/**
 * Listar sintomas de uma consulta específica
 * @param consultaId - ID da consulta
 * @param token - Token de autenticação (opcional, alguns endpoints podem ser públicos)
 */
export const listConsultaSintomasRequest = async (
    consultaId: string,
    token?: string
) => {
    try {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(endpoint.consultaSintomas(consultaId), {
            method: "GET",
            headers,
        });

        return response;
    } catch (e) {
        console.error("Erro ao listar sintomas da consulta", e);
        throw e;
    }
};

/**
 * Criar associação entre consulta e sintomas
 * @param token - Token de autenticação
 * @param consultaSintomaData - Dados (sintomas e consultaId)
 */
export const createConsultaSintomaRequest = async (
    token: string,
    consultaSintomaData: ConsultaSintomaData
) => {
    try {
        const response = await fetch(endpoint.consultas, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(consultaSintomaData),
        });

        return response;
    } catch (e) {
        console.error("Erro ao criar associação consulta-sintoma", e);
        throw e;
    }
};

/**
 * Deletar uma associação consulta-sintoma
 * @param id - ID da associação
 * @param token - Token de autenticação
 */
export const deleteConsultaSintomaRequest = async (
    id: string,
    token: string
) => {
    try {
        const response = await fetch(endpoint.consultaSintomaDelete(id), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (e) {
        console.error("Erro ao deletar associação consulta-sintoma", e);
        throw e;
    }
};
