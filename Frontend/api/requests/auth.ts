import { endpoint } from "../apiURL";

/**
 * Login do utilizador
 * @param email - Email do utilizador
 * @param password - Senha do utilizador
 */
export const loginRequest = async (email: string, password: string) => {
    try {
        const response = await fetch(endpoint.login, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        return response;
    } catch (e) {
        console.error("Erro ao fazer login", e);
        throw e;
    }
};

/**
 * Registo de novo utilizador
 * @param email - Email do utilizador
 * @param password - Senha do utilizador
 * @param tipo - Tipo de utilizador (paciente, medico, admin)
 * @param nome - Nome do utilizador
 * @param restoDados - Dados adicionais (opcional)
 */
export const registerRequest = async (
    email: string,
    password: string,
    tipo: "paciente" | "medico" | "admin",
    nome: string,
    restoDados?: Record<string, any>
) => {
    try {
        const response = await fetch(endpoint.register, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                tipo,
                nome,
                ...restoDados,
            }),
        });

        return response;
    } catch (e) {
        console.error("Erro ao fazer registo", e);
        throw e;
    }
};

/**
 * Logout do utilizador
 */
export const logoutRequest = async () => {
    try {
        const response = await fetch(endpoint.logout, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response;
    } catch (e) {
        console.error("Erro ao fazer logout", e);
        throw e;
    }
};

/**
 * Solicitar reset de senha
 * @param email - Email do utilizador
 */
export const requestPasswordResetRequest = async (email: string) => {
    try {
        const response = await fetch(endpoint.requestPasswordReset, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        return response;
    } catch (e) {
        console.error("Erro ao solicitar reset de senha", e);
        throw e;
    }
};

/**
 * Redefinir senha
 * @param token - Token de reset
 * @param password - Nova senha
 */
export const resetPasswordRequest = async (
    token: string,
    password: string
) => {
    try {
        const response = await fetch(endpoint.resetPassword, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, password }),
        });

        return response;
    } catch (e) {
        console.error("Erro ao redefinir senha", e);
        throw e;
    }
};

export const getUserCountRequest = async (token: string) => {
    try {
        const response = await fetch(endpoint.getUserCount, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (e) {
        console.error("Erro ao obter contagem de utilizadores", e);
        throw e;
    }
};

export const getQtdConsultasRequest = async (token: string) => {
    try {
        const response = await fetch(endpoint.getQtdConsultas, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (e) {
        console.error("Erro ao obter quantidade de consultas", e);
        throw e;
    }
};
export const getQtdConsultasMesRequest = async (token: string) => {
    try {
        const response = await fetch(endpoint.getQtdConsultasMes, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (e) {
        console.error("Erro ao obter quantidade de consultas do mês", e);
        throw e;
    }
};

